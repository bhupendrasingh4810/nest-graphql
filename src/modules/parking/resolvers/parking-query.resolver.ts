import {
    Resolver,
    Query,
    Args,
    Int,
} from '@nestjs/graphql';


import {
    ParkingQueryService,
} from '../services/parking-query.service';


import {
    ParkingLot,
} from '../entities/parking-lot.entity';



@Resolver()
export class ParkingQueryResolver {


    constructor(

        private readonly service:
            ParkingQueryService,

    ) { }



    /**
     * Search parking lots.
     */
    @Query(
        () => [ParkingLot],
    )
    async parkingSearch(

        @Args(
            'filter',
            {
                nullable: true,
            },
        )
        filter: any,

    ) {


        return this.service.search(
            filter || {},
        );

    }





    /**
     * Parking dashboard.
     */
    @Query(
        () => String,
    )
    async parkingDashboard(

        @Args(
            'id',
            {
                type: () => Int,
            },
        )
        id: number,

    ) {


        return JSON.stringify(

            await this.service.dashboard(
                id,
            ),

        );

    }

}