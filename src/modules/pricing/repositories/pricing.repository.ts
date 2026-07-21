import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ParkingPrice } from '../entities/parking-price.entity';

import { VehicleType } from 'src/modules/vehicles/enums/vehicle-type.enum';

@Injectable()
export class PricingRepository {
  constructor(
    @InjectRepository(ParkingPrice)
    private readonly repository: Repository<ParkingPrice>,
  ) {}

  async findByVehicleType(type: VehicleType) {
    return this.repository.findOne({
      where: {
        vehicleType: type,

        active: true,
      },
    });
  }

  async save(price: ParkingPrice) {
    return this.repository.save(price);
  }
}
