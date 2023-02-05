import { Listner } from "./base-listiner";
import nats, { Message, Stan } from "node-nats-streaming";
import { TicketCreatedEvent } from "./ticket-created-events";
import { Subjects } from "./subject";

export class TiketCreatedListner extends Listner<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queryGroupName = "payment-service";
  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Envent Data!:", data);
    msg.ack();
  }
}
