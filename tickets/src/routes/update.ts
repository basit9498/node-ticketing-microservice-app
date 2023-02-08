import {
  BadRequestError,
  NotAuthorizeError,
  NotFoundError,
  requiredAuth,
  validateResult,
} from "@ab-ticketing/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { TicketUpdatePublisher } from "../events/publisher/ticket-update-publisher";
import { Ticket } from "../model/tickets";
import { natsWrapper } from "../nats-wrapper";
const router = express.Router();

router.put(
  "/api/tickets/:id",
  requiredAuth,
  [
    body("title").not().isEmpty().withMessage("Title is Required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater then 0"),
  ],
  validateResult,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }
    if (ticket.orderId) {
      throw new BadRequestError("Cannot edit a reserved ticket");
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizeError();
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });

    await ticket.save();

    new TicketUpdatePublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });
    res.send(ticket);
  }
);
export { router as updateTicketRouter };
