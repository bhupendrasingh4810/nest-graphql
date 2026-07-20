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
    ParkingSlot,
} from '../entities/parking-slot.entity';


import {
    ParkingSlotStatus
} from '../enums/parking-slot-status.enum';



/**
 * Database layer for parking slots.
 */
@Injectable()
export class ParkingSlotRepository {


    constructor(

        @InjectRepository(ParkingSlot)

        private readonly repository:
            Repository<ParkingSlot>,

    ) { }



    /**
     * Find all available slots.
     */
    async findAvailableSlots()
        : Promise<ParkingSlot[]> {


        return this.repository.find({

            where: {

                status:
                    ParkingSlotStatus.AVAILABLE,

            },

            relations: {

                floor: true,

            },

            order: {

                id: 'ASC',

            },

        });

    }



    /**
     * Find slot by id.
     */
    async findById(
        id: number,
    ): Promise<ParkingSlot | null> {


        return this.repository.findOne({

            where: {

                id,

            },

            relations: {

                floor: true,

            },

        });

    }



    /**
     * Update slot.
     */
    async updateStatus(

        id: number,

        status: ParkingSlotStatus,

    ): Promise<void> {


        await this.repository.update(

            id,

            {

                status,

            },

        );

    }



    /**
     * Save slot.
     */
    async save(
        slot: ParkingSlot,
    ): Promise<ParkingSlot> {


        return this.repository.save(
            slot,
        );

    }

    /**
 * Save multiple slots.
 */
    async saveMany(
        slots: ParkingSlot[],
    ): Promise<ParkingSlot[]> {


        return this.repository.save(
            slots,
        );

    }
}