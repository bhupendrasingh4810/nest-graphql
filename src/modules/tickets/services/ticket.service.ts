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
import { ParkingService } from 'src/modules/parking/services/parking.service';
import { PricingService } from 'src/modules/pricing/services/pricing.service';
import { VehicleType } from 'src/modules/vehicles/enums/vehicle-type.enum';



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


        /**
         * Parking slot management.
         */
        private readonly parkingService:
            ParkingService,


        /**
         * Calculates parking charges.
         */
        private readonly pricingService:
            PricingService,

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
         * Find available slot.
         *
         * If user selected slot,
         * use that slot.
         */
        const slot =

            await this.parkingService
                .occupySlot(
                    input.slotId,
                );



        /**
         * Generate ticket number.
         */
        const ticketNumber =
            this.generateTicketNumber();



        /**
         * Create ticket entity.
         */
        const ticket =
            new ParkingTicket();



        ticket.ticketNumber =
            ticketNumber;



        /**
         * Assign vehicle.
         */
        ticket.vehicle = {

            id: input.vehicleId,

        } as any;



        /**
         * Assign occupied slot.
         */
        ticket.slot = slot;



        /**
         * Entry timestamp.
         */
        ticket.entryTime =
            new Date();



        /**
         * Initial amount.
         */
        ticket.amount = 0;



        /**
         * Ticket active.
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



        const ticket =

            await this.ticketRepository.findById(

                input.ticketId,

            );



        if (!ticket) {

            throw new NotFoundException(
                'Ticket not found',
            );

        }




        const exitTime = new Date();



        /**
         * Calculate amount.
         */
        const amount = await this.pricingService
            .calculateAmount(
                ticket.vehicle.type as VehicleType,
                ticket.entryTime,
                exitTime,

            );





        ticket.exitTime =
            exitTime;



        ticket.amount =
            amount;



        ticket.status =
            TicketStatus.COMPLETED;




        const savedTicket =

            await this.ticketRepository.save(
                ticket,
            );




        /**
         * Free parking slot.
         */
        await this.parkingService.releaseSlot(

            ticket.slot.id,

        );




        return savedTicket;

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