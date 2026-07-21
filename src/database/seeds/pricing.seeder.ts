import { Injectable } from "@nestjs/common";
import { PricingRepository } from "src/modules/pricing/repositories/pricing.repository";
import { VehicleType } from "src/modules/vehicles/enums/vehicle-type.enum";

@Injectable()
export class PricingSeeder {

    constructor(
        private readonly repository: PricingRepository,
    ) { }

    async seed() {
        const pricings = [
            {
                vehicleType: VehicleType.BIKE,
                hourlyRate: 20,
            },

            {
                vehicleType: VehicleType.CAR,
                hourlyRate: 50,
            },

            {
                vehicleType: VehicleType.SUV,
                hourlyRate: 80,
            },

            {
                vehicleType: VehicleType.BUS,
                hourlyRate: 150,
            },

        ];
        for (const pricing of pricings) {
            await this.repository.save(pricing);
        }

    }

}