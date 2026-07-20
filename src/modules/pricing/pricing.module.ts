import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParkingPrice } from "./entities/parking-price.entity";
import { PricingService } from "./services/pricing.service";
import { PricingRepository } from "./repositories/pricing.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ParkingPrice
        ])
    ],
    controllers: [],
    providers: [
        PricingService,
        PricingRepository
    ],
    exports: [
        PricingService
    ]
})

export class PricingModule {}