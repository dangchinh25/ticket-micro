import { Publisher, Subjects, TicketCreatedEvent } from '@clticketmicro/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
