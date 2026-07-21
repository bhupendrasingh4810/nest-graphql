import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ParkingLot } from '../entities/parking-lot.entity';

/**
 * Repository responsible
 * for database operations.
 */
@Injectable()
export class ParkingLotRepository {
  constructor(
    /**
     * Inject TypeORM repository.
     */
    @InjectRepository(ParkingLot)
    private readonly repository: Repository<ParkingLot>,
  ) {}

  /**
   * Create Parking Lot.
   */
  async create(parkingLot: Partial<ParkingLot>): Promise<ParkingLot> {
    const entity = this.repository.create(parkingLot);

    return this.repository.save(entity);
  }

  /**
   * Save existing entity.
   */
  async save(parkingLot: ParkingLot): Promise<ParkingLot> {
    return this.repository.save(parkingLot);
  }

  /**
   * Fetch all parking lots.
   */
  async findAll(): Promise<ParkingLot[]> {
    return this.repository.find({
      relations: {
        floors: true,
      },
    });
  }

  /**
   * Find one parking lot.
   */
  async findById(id: number): Promise<ParkingLot | null> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Delete entity.
   */
  async remove(parkingLot: ParkingLot): Promise<void> {
    await this.repository.remove(parkingLot);
  }
}
