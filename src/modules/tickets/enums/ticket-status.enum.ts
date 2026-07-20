import { registerEnumType } from '@nestjs/graphql';

/**
 * Parking ticket lifecycle.
 */
export enum TicketStatus {
    ACTIVE = 'ACTIVE',

    COMPLETED = 'COMPLETED',

    CANCELLED = 'CANCELLED',
}

registerEnumType(TicketStatus, {
    name: 'TicketStatus',
});