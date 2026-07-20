import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { ParkingLot } from '../entities/parking-lot.entity';

import { ParkingLotRepository } from '../repositories/parking-lot.repository';

import { CreateParkingLotInput } from '../dto/create-parking-lot.input';

import { UpdateParkingLotInput } from '../dto/update-parking-lot.input';

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

}