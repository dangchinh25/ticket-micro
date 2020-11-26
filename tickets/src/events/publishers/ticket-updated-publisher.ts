import { Publisher, Subjects, TicketUpdatedEvent } from '@clticketmicro/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
	subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
