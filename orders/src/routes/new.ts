import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requiredAuth,
  validateResult,
} from "@ab-ticketing/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { Order } from "../models/order";
import { Ticket } from "../models/tickets";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();
// const EXPIRATION_WINDOW_SECOND = 15 * 60;
const EXPIRATION_WINDOW_SECOND = 1 * 60;
router.post(
  "/api/orders",
  requiredAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Ticket Id is Required"),
  ],
  validateResult,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    //Find the ticket user is trying  in Database

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    // Make sure this ticket is not reserved

    // const existingOrder = await Order.findOne({
    //   ticket: ticket,
    //   status: {
    //     $in: [
    //       OrderStatus.Created,
    //       OrderStatus.AwaitingPayment,
    //       OrderStatus.Complete,
    //     ],
    //   },
    // });

    const isReserved = await ticket.isReserved();

    if (isReserved) {
      throw new BadRequestError("Ticket is already reserved");
    }

    // Calcutate the expiration time

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECOND); //for 15 mint 15*60

    // Buld the order and save DB
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expireAt: expiration,
      ticket,
    });

    await order.save();
    // Publish for order is created
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      expireAt: order.expireAt.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    });

    res.status(201).send(order);
  }
);
export { router as newOrderRouter };
