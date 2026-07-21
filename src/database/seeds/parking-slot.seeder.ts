import { Injectable } from "@nestjs/common";
import { ParkingSlot } from "src/modules/parking/entities/parking-slot.entity";
import { ParkingFloorRepository } from "src/modules/parking/repositories/parking-floor.repository";
import { ParkingSlotRepository } from "src/modules/parking/repositories/parking-slot.repository";
import { DeepPartial } from "typeorm";

@Injectable()
export class ParkingSlotSeeder {

    constructor(
        private readonly repository: ParkingSlotRepository,
        private readonly floorRepository: ParkingFloorRepository,
    ) { }

    async seed() {

        const floors = await this.floorRepository.findAll();

        for (const floor of floors) {

            const slots: DeepPartial<ParkingSlot>[] = [];

            for (let i = 1; i <= 20; i++) {

                const slot = {
                    slotNumber: `${floor.floorNumber}-${i}`,
                    floor,
                }
                await this.repository.save(slot);
            }
        }
    }
}