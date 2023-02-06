import { Message } from "node-nats-streaming";
import { Subjects, Listner, TicketCreatedEvent } from "@ab-ticketing/common";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/tickets";

export class TicketCreatedListener extends Listner<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queryGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}
