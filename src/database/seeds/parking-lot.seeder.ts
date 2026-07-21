import { Injectable } from "@nestjs/common";
import { ParkingLot } from "src/modules/parking/entities/parking-lot.entity";
import { ParkingLotRepository } from "src/modules/parking/repositories/parking-lot.repository";

@Injectable()
export class ParkingLotSeeder {

    constructor(
        private readonly repository: ParkingLotRepository,
    ) { }

    async seed() {

        const parkingLots = [

            {
                id: 101,
                code: 'PL1',
                name: 'Phoenix Mall',
                city: 'Lucknow',
                state: 'Uttar Pradesh',
                country: 'India',
            },

            {
                id: 102,
                code: 'PL2',
                name: 'Airport Parking',
                city: 'Delhi',
                state: 'Delhi',
                country: 'India',
            },

        ];
        for (const parkingLot of parkingLots) {
            await this.repository.save(parkingLot);
        }

        console.log('✔ Parking Lots Seeded');
    }

}