import {
  NotFoundError,
  requiredAuth,
  validateResult,
} from "@ab-ticketing/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../model/tickets";
const router = express.Router();

router.get("/api/tickets", async (req: Request, res: Response) => {
  const ticket = await Ticket.find({
    orderId: undefined,
  });

  res.send(ticket);
});
export { router as indexTicketRouter };
