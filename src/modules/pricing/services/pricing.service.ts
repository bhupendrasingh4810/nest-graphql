import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PricingRepository } from '../repositories/pricing.repository';

import { VehicleType } from 'src/modules/vehicles/enums/vehicle-type.enum';
import { ParkingPrice } from '../entities/parking-price.entity';
import { CreatePricingInput } from '../dto/create-pricing.input';
import { CreatePricingDto } from '../dto/create-pricing.dto';
import { UpdatePricingDto } from '../dto/update-pricing.dto';

@Injectable()
export class PricingService {
  constructor(private readonly pricingRepository: PricingRepository) {}

  async create(dto: CreatePricingDto): Promise<ParkingPrice> {
    const exists = await this.pricingRepository.findByVehicleType(dto.vehicleType);

    if (exists) {
      throw new ConflictException('Pricing already exists.');
    }

    const price = new ParkingPrice();

    price.vehicleType = dto.vehicleType;

    price.hourlyRate = dto.hourlyRate;

    return this.pricingRepository.save(price);
  }

  async update(id: number, dto: UpdatePricingDto): Promise<ParkingPrice> {
    const price = await this.findOne(id);

    Object.assign(price, dto);

    return this.pricingRepository.save(price);
  }

  async remove(id: number): Promise<boolean> {
    await this.findOne(id);

    await this.pricingRepository.delete(id);

    return true;
  }

  async findAll(): Promise<ParkingPrice[]> {
    return this.pricingRepository.findAll();
  }

  async findOne(id: number): Promise<ParkingPrice> {
    const price = await this.pricingRepository.findById(id);

    if (!price) {
      throw new NotFoundException('Pricing not found.');
    }

    return price;
  }

  async findByVehicleType(vehicleType: VehicleType): Promise<ParkingPrice> {
    const price = await this.pricingRepository.findByVehicleType(vehicleType);

    if (!price) {
      throw new NotFoundException('Pricing not found.');
    }

    return price;
  }

  async calculateAmount(
    vehicleType: VehicleType,
    entryTime: Date,
    exitTime: Date,
  ): Promise<number> {
    const pricing = await this.findByVehicleType(vehicleType);

    const milliseconds = exitTime.getTime() - entryTime.getTime();

    const hours = Math.ceil(milliseconds / (1000 * 60 * 60));

    return hours * Number(pricing.hourlyRate);
  }
}
