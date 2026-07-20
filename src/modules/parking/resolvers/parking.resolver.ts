import {
    Args,
    Int,
    Mutation,
    Query,
    Resolver,
} from '@nestjs/graphql';

import { ParkingLot } from '../entities/parking-lot.entity';

import { ParkingService } from '../services/parking.service';

import { CreateParkingLotInput } from '../dto/create-parking-lot.input';

import { UpdateParkingLotInput } from '../dto/update-parking-lot.input';
import { ParkingSlot } from '../entities/parking-slot.entity';

/**
 * GraphQL Resolver for Parking Lot.
 *
 * Resolver receives GraphQL requests
 * and forwards them to the service.
 */
@Resolver(() => ParkingLot)
export class ParkingResolver {

    constructor(

        /**
         * Business logic.
         */
        private readonly parkingService: ParkingService,

    ) { }

    /**
     * GraphQL Mutation
     *
     * Create Parking Lot
     */
    @Mutation(() => ParkingLot, {
        name: 'createParkingLot',
    })
    async createParkingLot(

        @Args('input')
        input: CreateParkingLotInput,

    ): Promise<ParkingLot> {

        return this.parkingService.createParkingLot(
            input,
        );

    }

    /**
     * GraphQL Query
     *
     * Fetch all parking lots.
     */
    @Query(() => [ParkingLot], {
        name: 'parkingLots',
    })
    async parkingLots(): Promise<ParkingLot[]> {

        return this.parkingService.getParkingLots();

    }

    /**
     * GraphQL Query
     *
     * Fetch one parking lot.
     */
    @Query(() => ParkingLot, {
        name: 'parkingLot',
    })
    async parkingLot(

        @Args(
            'id',
            {
                type: () => Int,
            },
        )
        id: number,

    ): Promise<ParkingLot> {

        return this.parkingService.getParkingLotById(
            id,
        );

    }

    /**
     * GraphQL Mutation
     *
     * Update parking lot.
     */
    @Mutation(() => ParkingLot)
    async updateParkingLot(

        @Args('input')
        input: UpdateParkingLotInput,

    ): Promise<ParkingLot> {

        return this.parkingService.updateParkingLot(
            input,
        );

    }

    /**
     * GraphQL Mutation
     *
     * Delete parking lot.
     */
    @Mutation(() => Boolean)
    async deleteParkingLot(

        @Args(
            'id',
            {
                type: () => Int,
            },
        )
        id: number,

    ): Promise<boolean> {

        await this.parkingService.deleteParkingLot(
            id,
        );

        return true;

    }

    /**
     * Get all available slots.
     *
     * Query:
     *
     * availableSlots
     */
    @Query(
        () => [ParkingSlot],
    )
    async availableSlots()
        : Promise<ParkingSlot[]> {


        return this.parkingService
            .getAvailableSlots();

    }



    /**
     * Occupy slot.
     *
     * Mutation:
     *
     * occupySlot(slotId:1)
     */
    @Mutation(
        () => ParkingSlot,
    )
    async occupySlot(

        @Args(
            'slotId',
            {
                type: () => Int,
            },
        )
        slotId: number,

    ): Promise<ParkingSlot> {


        return this.parkingService
            .occupySlot(
                slotId,
            );

    }



    /**
     * Release slot.
     *
     * Mutation:
     *
     * releaseSlot(slotId:1)
     */
    @Mutation(
        () => ParkingSlot,
    )
    async releaseSlot(

        @Args(
            'slotId',
            {
                type: () => Int,
            },
        )
        slotId: number,

    ): Promise<ParkingSlot> {


        return this.parkingService
            .releaseSlot(
                slotId,
            );

    }
}