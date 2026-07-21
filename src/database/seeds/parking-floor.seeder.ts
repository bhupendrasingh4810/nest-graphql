import { Injectable } from "@nestjs/common";
import { ParkingFloorRepository } from "src/modules/parking/repositories/parking-floor.repository";
import { ParkingLotRepository } from "src/modules/parking/repositories/parking-lot.repository";

@Injectable()
export class ParkingFloorSeeder {

    constructor(
        private readonly repository: ParkingFloorRepository,
        private readonly parkingRepository: ParkingLotRepository,
    ) { }

    async seed() {

        const parking = await this.parkingRepository.findById(1);

        if (!parking) return;

        const parkingFloors = [
            {
                floorNumber: 0,
                parkingLot: parking,
            },
            {
                floorNumber: 1,
                parkingLot: parking,
            },
            {
                floorNumber: 2,
                parkingLot: parking,
            },
        ];

        for (const parkingFloor of parkingFloors) {
            await this.repository.save(parkingFloor);
        }
    }
}