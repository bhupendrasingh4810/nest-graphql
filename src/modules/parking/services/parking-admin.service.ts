import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';


import {
    ParkingLotRepository,
} from '../repositories/parking-lot.repository';


import {
    ParkingFloorRepository,
} from '../repositories/parking-floor.repository';


import {
    ParkingSlotRepository,
} from '../repositories/parking-slot.repository';


import {
    ParkingLot,
} from '../entities/parking-lot.entity';


import {
    ParkingFloor,
} from '../entities/parking-floor.entity';


import {
    ParkingSlot,
} from '../entities/parking-slot.entity';



import {
    CreateParkingLotInput,
} from '../dto/create-parking-lot.input';


import {
    CreateFloorInput,
} from '../dto/create-parking-floor.input';


import {
    CreateSlotInput,
} from '../dto/create-parking-slot.input';


import {
    ParkingSlotStatus,
} from '../enums/parking-slot-status.enum';



/**
 * Admin parking management.
 *
 * Responsible for:
 *
 * - Creating parking lots
 * - Creating floors
 * - Creating slots
 */
@Injectable()
export class ParkingAdminService {


    constructor(


        private readonly lotRepository:
            ParkingLotRepository,


        private readonly floorRepository:
            ParkingFloorRepository,


        private readonly slotRepository:
            ParkingSlotRepository,


    ) { }



    /**
     * Create parking lot.
     */
    async createParkingLot(

        input: CreateParkingLotInput,

    ): Promise<ParkingLot> {


        const lot =
            new ParkingLot();



        lot.name =
            input.name;



        lot.address =
            input.address;



        return this.lotRepository.save(
            lot,
        );

    }





    /**
     * Create parking floor.
     */
    async createFloor(

        input: CreateFloorInput,

    ): Promise<ParkingFloor> {



        const lot =
            await this.lotRepository.findById(

                input.parkingLotId,

            );



        if (!lot) {

            throw new NotFoundException(
                'Parking lot not found',
            );

        }



        const floor =
            new ParkingFloor();



        floor.floorNumber =
            input.floorNumber;



        /**
         * Attach floor
         * to parking lot.
         */
        floor.lot =
            lot;



        return this.floorRepository.save(
            floor,
        );

    }





    /**
     * Create single slot.
     */
    async createSlot(

        input: CreateSlotInput,

    ): Promise<ParkingSlot> {



        const slot =
            new ParkingSlot();



        slot.slotNumber =
            input.slotNumber;



        slot.status =
            ParkingSlotStatus.AVAILABLE;



        /**
         * Floor relation.
         */
        slot.floor = {

            id: input.floorId,

        } as ParkingFloor;



        return this.slotRepository.save(
            slot,
        );

    }





    /**
     * Generate multiple slots.
     *
     * Example:
     *
     * Floor 1
     * Count 5
     *
     * Creates:
     *
     * A-101
     * A-102
     * A-103
     * A-104
     * A-105
     */
    async generateSlots(

        floorId: number,

        count: number,

    ): Promise<ParkingSlot[]> {



        const slots:
            ParkingSlot[] = [];



        for (
            let index = 1;
            index <= count;
            index++
        ) {


            const slot =
                new ParkingSlot();



            slot.slotNumber =

                `A-${100 + index}`;



            slot.status =

                ParkingSlotStatus.AVAILABLE;



            slot.floor = {

                id: floorId,

            } as ParkingFloor;



            slots.push(
                slot,
            );

        }



        return this.slotRepository
            .saveMany(
                slots,
            );

    }

}