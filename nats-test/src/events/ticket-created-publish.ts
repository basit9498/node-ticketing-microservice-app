import { Publisher } from "./base-publisher";
import { TicketCreatedEvent } from "../events/ticket-created-events";
import { Subjects } from "./subject";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
