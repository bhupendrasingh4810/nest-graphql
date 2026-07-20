import {
    Resolver,
    Mutation,
    Args,
    Int,
} from '@nestjs/graphql';


import {
    ParkingAdminService,
} from '../services/parking-admin.service';


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


/**
 * Admin GraphQL APIs.
 */
@Resolver()
export class ParkingAdminResolver {


    constructor(

        private readonly parkingAdminService:
            ParkingAdminService,

    ) { }



    /**
     * Create parking lot.
     */
    @Mutation(
        () => ParkingLot,
    )
    async createParkingLot(

        @Args(
            'input',
        )
        input: CreateParkingLotInput,

    ): Promise<ParkingLot> {


        return this.parkingAdminService
            .createParkingLot(
                input,
            );

    }




    /**
     * Create floor.
     */
    @Mutation(
        () => ParkingFloor,
    )
    async createParkingFloor(

        @Args(
            'input',
        )
        input: CreateFloorInput,

    ): Promise<ParkingFloor> {


        return this.parkingAdminService
            .createFloor(
                input,
            );

    }





    /**
     * Create slot.
     */
    @Mutation(
        () => ParkingSlot,
    )
    async createParkingSlot(

        @Args(
            'input',
        )
        input: CreateSlotInput,

    ): Promise<ParkingSlot> {


        return this.parkingAdminService
            .createSlot(
                input,
            );

    }





    /**
     * Generate multiple slots.
     */
    @Mutation(
        () => [ParkingSlot],
    )
    async generateParkingSlots(

        @Args(
            'floorId',
            {
                type: () => Int,
            },
        )
        floorId: number,



        @Args(
            'count',
            {
                type: () => Int,
            },
        )
        count: number,

    ): Promise<ParkingSlot[]> {


        return this.parkingAdminService
            .generateSlots(
                floorId,
                count,
            );

    }

}