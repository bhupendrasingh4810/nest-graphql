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

  async save(price: ParkingPrice): Promise<ParkingPrice> {
    return this.repository.save(price);
  }

  async findAll(): Promise<ParkingPrice[]> {
    return this.repository.find({
      order: {
        vehicleType: 'ASC',
      },
    });
  }

  async findById(id: number): Promise<ParkingPrice | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findByVehicleType(vehicleType: VehicleType): Promise<ParkingPrice | null> {
    return this.repository.findOne({
      where: {
        vehicleType,
      },
    });
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
