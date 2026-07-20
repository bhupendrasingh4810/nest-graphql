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
import { ParkingSlotRepository } from './repositories/parking-slot.repository';
import { ParkingAdminService } from './services/parking-admin.service';
import { ParkingFloorRepository } from './repositories/parking-floor.repository';
import { ParkingAdminController } from './controllers/parking-admin.controller';
import { ParkingAdminResolver } from './resolvers/parking-admin.resolver';

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
        ParkingController,
        ParkingAdminController
    ],
    providers: [
        ParkingLotRepository,
        ParkingSlotRepository,
        ParkingFloorRepository,
        ParkingService,
        ParkingAdminService,
        ParkingResolver,
        ParkingAdminResolver
    ],
    exports: [
        // ParkingLotRepository,
        ParkingService,
        ParkingAdminService
    ]
})
export class ParkingModule { }
