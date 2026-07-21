// ============================================================================
// src/modules/vehicle/repositories/vehicle.repository.ts
// ============================================================================

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Vehicle } from '../entities/vehicle.entity';

@Injectable()
export class VehicleRepository {
  constructor(
    @InjectRepository(Vehicle)
    private readonly repository: Repository<Vehicle>,
  ) {}

  async save(vehicle: Vehicle): Promise<Vehicle> {
    return this.repository.save(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.repository.find({
      relations: {
        owner: true,
        tickets: true,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async findById(id: number): Promise<Vehicle | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        owner: true,
        tickets: true,
      },
    });
  }

  async findByRegistration(registrationNumber: string): Promise<Vehicle | null> {
    return this.repository.findOne({
      where: {
        registrationNumber,
      },
      relations: {
        owner: true,
        tickets: true,
      },
    });
  }

  async findByOwner(ownerId: number): Promise<Vehicle[]> {
    return this.repository.find({
      where: {
        owner: {
          id: ownerId,
        },
      },
      relations: {
        owner: true,
      },
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
