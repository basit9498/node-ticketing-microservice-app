import { Publisher, Subjects, TicketUpdateEvent } from "@ab-ticketing/common";

export class TicketUpdatePublisher extends Publisher<TicketUpdateEvent> {
  subject: Subjects.TicketUpdate = Subjects.TicketUpdate;
}
