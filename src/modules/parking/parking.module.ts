import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLot } from './entities/parking-lot.entity';
import { ParkingFloor } from './entities/parking-floor.entity';
import { ParkingSlot } from './entities/parking-slot.entity';
import { ParkingZone } from './entities/parking-zone.entity';
import { ParkingLotRepository } from './repositories/parking-lot.repository';
import { ParkingService } from './services/parking.service';
import { ParkingResolver } from './resolvers/parking.resolver';
import { ParkingController } from './controllers/parking.controller';

@Module({
    imports: [
        /**
         * Register parking entities.
         */
        TypeOrmModule.forFeature([
            ParkingLot,
            ParkingFloor,
            ParkingZone,
            ParkingSlot
        ]),
    ],
    controllers: [
        ParkingController
    ],
    providers: [
        ParkingLotRepository,
        ParkingService,
        ParkingResolver
    ],
    exports: [
        ParkingLotRepository,
        ParkingService
    ]
})
export class ParkingModule { }
