import {

    Injectable,

    NotFoundException,

} from '@nestjs/common';


import {

    PricingRepository,

} from '../repositories/pricing.repository';

import { VehicleType } from 'src/modules/vehicles/enums/vehicle-type.enum';



@Injectable()
export class PricingService {


    constructor(

        private readonly repository:
            PricingRepository,

    ) { }





    /**
     * Calculate parking amount.
     */
    async calculateAmount(

        vehicleType: VehicleType,

        entryTime: Date,

        exitTime: Date,

    ): Promise<number> {



        const pricing =

            await this.repository
                .findByVehicleType(
                    vehicleType,
                );



        if (!pricing) {

            throw new NotFoundException(
                'Pricing not configured',
            );

        }





        const milliseconds =

            exitTime.getTime()
            -
            entryTime.getTime();




        let hours =

            milliseconds
            /
            (1000 * 60 * 60);




        /**
         * Minimum one hour charge.
         */
        hours =
            Math.ceil(
                hours || 1,
            );




        return (

            Number(
                pricing.hourlyRate,
            )
            *
            hours

        );


    }

}