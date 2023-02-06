import { Message } from "node-nats-streaming";
import { Subjects, Listner, TicketUpdateEvent } from "@ab-ticketing/common";

import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/tickets";

export class TicketUpdatedListener extends Listner<TicketUpdateEvent> {
  subject: Subjects.TicketUpdate = Subjects.TicketUpdate;
  queryGroupName = queueGroupName;

  async onMessage(data: TicketUpdateEvent["data"], msg: Message) {
    // const ticket = await Ticket.findById(data.id);

    // const ticket = await Ticket.findOne({
    //   _id: data.id,
    //   version: data.version - 1,
    // });

    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
