// ============================================================================
// src/modules/vehicle/services/vehicle.service.ts
// ============================================================================

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { VehicleRepository } from '../repositories/vehicle.repository';
import { Vehicle } from '../entities/vehicle.entity';

import { CreateVehicleInput } from '../dto/create-vehicle.input';
import { UpdateVehicleInput } from '../dto/update-vehicle.input';

@Injectable()
export class VehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async create(dto: CreateVehicleInput): Promise<Vehicle> {
    const exists = await this.vehicleRepository.findByRegistration(dto.registrationNumber);

    if (exists) {
      throw new ConflictException('Vehicle already exists.');
    }

    const vehicle = new Vehicle();

    vehicle.registrationNumber = dto.registrationNumber;

    vehicle.type = dto.type;

    vehicle.manufacturer = dto.manufacturer;

    vehicle.model = dto.model;

    vehicle.color = dto.color;

    return this.vehicleRepository.save(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.findAll();
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findById(id);

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found.');
    }

    return vehicle;
  }

  async findByRegistration(registrationNumber: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findByRegistration(registrationNumber);

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found.');
    }

    return vehicle;
  }

  async update(id: number, dto: UpdateVehicleInput): Promise<Vehicle> {
    const vehicle = await this.findOne(id);

    Object.assign(vehicle, dto);

    return this.vehicleRepository.save(vehicle);
  }

  async remove(id: number): Promise<boolean> {
    await this.findOne(id);

    await this.vehicleRepository.delete(id);

    return true;
  }
}
