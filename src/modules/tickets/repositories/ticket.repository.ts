import {
    Injectable,
} from '@nestjs/common';


import {
    InjectRepository,
} from '@nestjs/typeorm';


import {
    Repository,
} from 'typeorm';


import {
    ParkingTicket,
} from '../entities/parking-ticket.entity';

import {
    TicketStatus,
} from '../enums/ticket-status.enum';

/**
 * Ticket database layer.
 */
@Injectable()
export class TicketRepository {

    constructor(
        @InjectRepository(ParkingTicket)
        private readonly repository:
            Repository<ParkingTicket>,
    ) { }

    /**
     * Save ticket.
     */
    async save(
        ticket: ParkingTicket,
    ): Promise<ParkingTicket> {
        return this.repository.save(
            ticket,
        );
    }

    /**
     * Find active ticket
     * for vehicle.
     */
    /**
     * Find active ticket
     * for vehicle.
     */
    async findActiveByVehicle(
        vehicleId: number,
    ): Promise<ParkingTicket | null> {


        return this.repository.findOne({

            where: {

                vehicle: {

                    id: vehicleId,

                },


                status: TicketStatus.ACTIVE,

            },


            relations: {

                vehicle: true,

                slot: true,

            },

        });

    }

    /**
     * Find ticket by id.
     */
    /**
     * Find ticket by id.
     */
    async findById(
        id: number,
    ): Promise<ParkingTicket | null> {


        return this.repository.findOne({

            where: {

                id,

            },


            relations: {

                vehicle: true,

                slot: true,

            },

        });

    }
}