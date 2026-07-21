import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ParkingLot } from '../entities/parking-lot.entity';

import { ParkingFilterInput } from '../dto/parking-filter.input';

import { ParkingSlotStatus } from '../enums/parking-slot-status.enum';

@Injectable()
export class ParkingQueryService {
  constructor(
    @InjectRepository(ParkingLot)
    private readonly repository: Repository<ParkingLot>,
  ) {}

  /**
   * Search parking lots.
   */
  async search(filter: ParkingFilterInput): Promise<ParkingLot[]> {
    const query = this.repository
      .createQueryBuilder('lot')

      .leftJoinAndSelect('lot.floors', 'floor')

      .leftJoinAndSelect('floor.slots', 'slot');

    if (filter.name) {
      query.andWhere('lot.name ILIKE :name', {
        name: `%${filter.name}%`,
      });
    }

    if (filter.address) {
      query.andWhere('lot.address ILIKE :address', {
        address: `%${filter.address}%`,
      });
    }

    return query.getMany();
  }

  /**
   * Parking dashboard.
   */
  async dashboard(id: number) {
    const lot = await this.repository.findOne({
      where: {
        id,
      },

      relations: {
        floors: {
          slots: true,
        },
      },
    });

    if (!lot) {
      return null;
    }

    let total = 0;

    let available = 0;

    let occupied = 0;

    lot.floors.forEach((floor) => {
      floor.slots.forEach((slot) => {
        total++;

        if (slot.status === ParkingSlotStatus.AVAILABLE) {
          available++;
        }

        if (slot.status === ParkingSlotStatus.OCCUPIED) {
          occupied++;
        }
      });
    });

    return {
      parkingLot: lot,

      totalSlots: total,

      availableSlots: available,

      occupiedSlots: occupied,
    };
  }
}
