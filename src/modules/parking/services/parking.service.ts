import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { ParkingLot } from '../entities/parking-lot.entity';

import { ParkingLotRepository } from '../repositories/parking-lot.repository';

import { CreateParkingLotInput } from '../dto/create-parking-lot.input';

import { UpdateParkingLotInput } from '../dto/update-parking-lot.input';
import { ParkingSlotStatus } from '../enums/parking-slot-status.enum';
import { ParkingSlotRepository } from '../repositories/parking-slot.repository';
import { ParkingSlot } from '../entities/parking-slot.entity';

/**
 * Parking business logic.
 */
@Injectable()
export class ParkingService {

    constructor(

        /**
         * Parking repository.
         */
        private readonly parkingLotRepository: ParkingLotRepository,
        private readonly slotRepository: ParkingSlotRepository
    ) { }

    /**
     * Create Parking Lot.
     */
    async createParkingLot(
        input: CreateParkingLotInput,
    ): Promise<ParkingLot> {

        /**
         * Convert DTO into Entity.
         */
        const parkingLot = await this.parkingLotRepository.create({

            name: input.name,

            code: input.code,

            address: input.address,

            city: input.city,

            state: input.state,

            country: input.country,

            postalCode: input.postalCode,

            latitude: input.latitude,

            longitude: input.longitude,

        });

        return parkingLot;
    }

    /**
     * Fetch all parking lots.
     */
    async getParkingLots(): Promise<ParkingLot[]> {

        return this.parkingLotRepository.findAll();

    }

    /**
     * Fetch single parking lot.
     */
    async getParkingLotById(
        id: number,
    ): Promise<ParkingLot> {

        const parkingLot =
            await this.parkingLotRepository.findById(id);

        if (!parkingLot) {

            throw new NotFoundException(
                `Parking Lot ${id} not found`,
            );

        }

        return parkingLot;

    }

    /**
     * Update parking lot.
     */
    async updateParkingLot(
        input: UpdateParkingLotInput,
    ): Promise<ParkingLot> {

        const parkingLot =
            await this.getParkingLotById(input.id);

        /**
         * Copy only supplied properties.
         */
        Object.assign(
            parkingLot,
            input,
        );

        return this.parkingLotRepository.save(
            parkingLot,
        );

    }

    /**
     * Delete parking lot.
     */
    async deleteParkingLot(
        id: number,
    ): Promise<void> {

        const parkingLot =
            await this.getParkingLotById(id);

        await this.parkingLotRepository.remove(
            parkingLot,
        );

    }

    /**
     * Get available slots.
     */
    async getAvailableSlots()
        : Promise<ParkingSlot[]> {


        return this.slotRepository
            .findAvailableSlots();

    }



    /**
     * Occupy parking slot.
     *
     * Called when vehicle enters.
     */
    async occupySlot(

        slotId: number,

    ): Promise<ParkingSlot> {


        const slot =
            await this.slotRepository.findById(
                slotId,
            );


        if (!slot) {

            throw new NotFoundException(
                'Parking slot not found',
            );

        }



        /**
         * Slot already occupied.
         */
        if (
            slot.status ===
            ParkingSlotStatus.OCCUPIED
        ) {

            throw new Error(
                'Slot already occupied',
            );

        }



        await this.slotRepository.updateStatus(

            slotId,

            ParkingSlotStatus.OCCUPIED,

        );



        slot.status =
            ParkingSlotStatus.OCCUPIED;


        return slot;

    }




    /**
     * Release parking slot.
     *
     * Called after checkout.
     */
    async releaseSlot(

        slotId: number,

    ): Promise<ParkingSlot> {


        const slot =
            await this.slotRepository.findById(
                slotId,
            );


        if (!slot) {

            throw new NotFoundException(
                'Parking slot not found',
            );

        }



        await this.slotRepository.updateStatus(

            slotId,

            ParkingSlotStatus.AVAILABLE,

        );



        slot.status =
            ParkingSlotStatus.AVAILABLE;



        return slot;

    }




    /**
     * Find nearest available slot.
     */
    async findNearestSlot()
        : Promise<ParkingSlot | null> {


        const slots =
            await this.slotRepository
                .findAvailableSlots();



        return slots.length
            ? slots[0]
            : null;

    }
}