import { Injectable, NotFoundException } from '@nestjs/common';

import { PricingRepository } from '../repositories/pricing.repository';

import { VehicleType } from 'src/modules/vehicles/enums/vehicle-type.enum';
import { ParkingPrice } from '../entities/parking-price.entity';
import { CreatePriceInput } from '../dto/create-price.input';

@Injectable()
export class PricingService {
  constructor(private readonly repository: PricingRepository) {}

  async create(input: CreatePriceInput): Promise<ParkingPrice> {
    const price = new ParkingPrice();

    price.vehicleType = input.vehicleType;
    price.hourlyRate = input.hourlyRate;
    price.active = true;

    return this.repository.save(price);
  }

  /**
   * Calculate parking amount.
   */
  async calculateAmount(
    vehicleType: VehicleType,

    entryTime: Date,

    exitTime: Date,
  ): Promise<number> {
    const pricing = await this.repository.findByVehicleType(vehicleType);

    if (!pricing) {
      throw new NotFoundException('Pricing not configured');
    }

    const milliseconds = exitTime.getTime() - entryTime.getTime();

    let hours = milliseconds / (1000 * 60 * 60);

    /**
     * Minimum one hour charge.
     */
    hours = Math.ceil(hours || 1);

    return Number(pricing.hourlyRate) * hours;
  }
}
