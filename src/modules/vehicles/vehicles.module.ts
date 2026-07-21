import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleController } from './controllers/vehicle.controller';
import { VehicleService } from './services/vehicle.service';
import { VehicleResolver } from './resolvers/vehicle.resolver';
import { VehicleRepository } from './repositories/vehicle.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehicleController],
  providers: [VehicleService, VehicleResolver, VehicleRepository],
  exports: [VehicleService],
})
export class VehiclesModule {}
