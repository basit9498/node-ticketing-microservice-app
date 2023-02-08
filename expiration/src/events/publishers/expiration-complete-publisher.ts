import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@ab-ticketing/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
