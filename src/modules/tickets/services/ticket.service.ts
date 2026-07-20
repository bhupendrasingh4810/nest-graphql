import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';


import {
    TicketRepository,
} from '../repositories/ticket.repository';


import {
    CreateTicketInput,
} from '../dto/create-ticket.input';


import {
    CloseTicketInput,
} from '../dto/close-ticket.input';


import {
    ParkingTicket,
} from '../entities/parking-ticket.entity';


import {
    TicketStatus,
} from '../enums/ticket-status.enum';



/**
 * Ticket business logic.
 *
 * Handles:
 *
 * - Create parking ticket
 * - Close parking ticket
 * - Calculate parking amount
 */
@Injectable()
export class TicketService {


    constructor(

        /**
         * Ticket database layer.
         */
        private readonly ticketRepository:
            TicketRepository,

    ) { }



    /**
     * Create parking ticket.
     *
     * Flow:
     *
     * Vehicle
     *    |
     * Slot
     *    |
     * Ticket
     */
    async createTicket(

        input: CreateTicketInput,

    ): Promise<ParkingTicket> {



        /**
         * Later:
         *
         * Validate vehicle exists
         *
         * Validate slot exists
         *
         * Check slot available
         */


        /**
         * Generate unique ticket number.
         */
        const ticketNumber =
            this.generateTicketNumber();



        /**
         * Create ticket object.
         */
        const ticket =
            new ParkingTicket();


        ticket.ticketNumber =
            ticketNumber;


        /**
         * Temporary relation assignment.
         *
         * Later replaced by repositories.
         */
        ticket.vehicle = {

            id: input.vehicleId,

        } as any;



        ticket.slot = {

            id: input.slotId,

        } as any;



        /**
         * Ticket starts now.
         */
        ticket.entryTime =
            new Date();



        /**
         * Default amount.
         */
        ticket.amount = 0;



        /**
         * Active ticket.
         */
        ticket.status =
            TicketStatus.ACTIVE;



        return this.ticketRepository.save(
            ticket,
        );

    }




    /**
     * Close parking ticket.
     *
     * Calculates:
     *
     * Exit time
     * Duration
     * Amount
     */
    async closeTicket(

        input: CloseTicketInput,

    ): Promise<ParkingTicket> {


        /**
         * Find ticket.
         */
        const ticket =
            await this.ticketRepository.findById(
                input.ticketId,
            );


        if (!ticket) {

            throw new NotFoundException(
                'Parking ticket not found.',
            );

        }



        /**
         * Already closed.
         */
        if (
            ticket.status !==
            TicketStatus.ACTIVE
        ) {

            throw new BadRequestException(
                'Ticket already closed.',
            );

        }



        /**
         * Set exit time.
         */
        ticket.exitTime =
            new Date();



        /**
         * Calculate amount.
         */
        ticket.amount =
            this.calculateAmount(

                ticket.entryTime,

                ticket.exitTime,

            );



        /**
         * Mark completed.
         */
        ticket.status =
            TicketStatus.COMPLETED;



        return this.ticketRepository.save(
            ticket,
        );

    }


    /**
     * Find ticket by id.
     */
    async findById(
        id: number,
    ): Promise<ParkingTicket | null> {


        return this.ticketRepository.findById(
            id,
        );

    }

    /**
     * Generate ticket number.
     *
     * Example:
     *
     * PK-2026-123456
     */
    private generateTicketNumber(): string {


        return (

            'PK-' +

            Date.now()

        );

    }




    /**
     * Calculate parking fee.
     *
     * Example:
     *
     * First hour = 50
     * Every next hour = 30
     */
    private calculateAmount(

        entryTime: Date,

        exitTime: Date,

    ): number {


        const milliseconds =
            exitTime.getTime()
            -
            entryTime.getTime();



        const hours =
            Math.ceil(

                milliseconds
                /
                (1000 * 60 * 60)

            );



        if (hours <= 1) {

            return 50;

        }



        return (

            50 +

            (
                (hours - 1)
                *
                30
            )

        );

    }

}