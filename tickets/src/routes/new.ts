import { requiredAuth, validateResult } from "@ab-ticketing/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../model/tickets";
const router = express.Router();

router.post(
  "/api/tickets",
  requiredAuth,
  [
    body("title").not().isEmpty().withMessage("Title is Required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater then 0"),
  ],
  validateResult,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await ticket.save();
    res.status(201).send(ticket);
  }
);

export { router as createTicketsRouter };
