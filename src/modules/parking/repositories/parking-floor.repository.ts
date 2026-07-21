import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ParkingFloor } from '../entities/parking-floor.entity';

@Injectable()
export class ParkingFloorRepository {
  constructor(
    @InjectRepository(ParkingFloor)
    private readonly repository: Repository<ParkingFloor>,
  ) {}

  async save(floor: ParkingFloor): Promise<ParkingFloor> {
    return this.repository.save(floor);
  }
}
