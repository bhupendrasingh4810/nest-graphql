import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ParkingTicket } from '../entities/parking-ticket.entity';
import { TicketStatus } from '../enums/ticket-status.enum';

/**
 * Ticket database layer.
 */
@Injectable()
export class TicketRepository {
  constructor(
    @InjectRepository(ParkingTicket)
    private readonly repository: Repository<ParkingTicket>,
  ) { }

  /**
     * Create / Update Ticket
     */
  async save(
    ticket: ParkingTicket,
  ): Promise<ParkingTicket> {
    return this.repository.save(ticket);
  }

  /**
   * Find all tickets.
   */
  async findAll(): Promise<ParkingTicket[]> {
    return this.repository.find({
      relations: {
        vehicle: true,
        slot: {
          floor: {
            parkingLot: true,
          },
        },
      },
      order: {
        id: 'DESC',
      },
    });
  }

  /**
   * Find ticket by id.
   */
  async findById(
    id: number,
  ): Promise<ParkingTicket | null> {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: {
        vehicle: true,
        slot: {
          floor: {
            parkingLot: true,
          },
        },
      },
    });
  }

  /**
   * Find ticket by ticket number.
   */
  async findByTicketNumber(
    ticketNumber: string,
  ): Promise<ParkingTicket | null> {
    return this.repository.findOne({
      where: {
        ticketNumber,
      },
      relations: {
        vehicle: true,
        slot: {
          floor: {
            parkingLot: true,
          },
        },
      },
    });
  }

  /**
   * Get all active tickets.
   */
  async findActiveTickets(): Promise<ParkingTicket[]> {
    return this.repository.find({
      where: {
        status: TicketStatus.ACTIVE,
      },
      relations: {
        vehicle: true,
        slot: {
          floor: {
            parkingLot: true,
          },
        },
      },
      order: {
        entryTime: 'DESC',
      },
    });
  }

  /**
   * Find active ticket of vehicle.
   */
  async findActiveByVehicle(
    vehicleId: number,
  ): Promise<ParkingTicket | null> {
    return this.repository.findOne({
      where: {
        vehicle: {
          id: vehicleId,
        },
        status: TicketStatus.ACTIVE,
      },
      relations: {
        vehicle: true,
        slot: {
          floor: {
            parkingLot: true,
          },
        },
      },
    });
  }

  /**
   * Parking history of vehicle.
   */
  async findVehicleHistory(
    vehicleId: number,
  ): Promise<ParkingTicket[]> {
    return this.repository.find({
      where: {
        vehicle: {
          id: vehicleId,
        },
      },
      relations: {
        vehicle: true,
        slot: {
          floor: {
            parkingLot: true,
          },
        },
      },
      order: {
        entryTime: 'DESC',
      },
    });
  }

  /**
   * Delete ticket.
   */
  async delete(
    id: number,
  ): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  /**
   * Count active tickets.
   */
  async countActive(): Promise<number> {
    return this.repository.count({
      where: {
        status: TicketStatus.ACTIVE,
      },
    });
  }

  /**
   * Count completed tickets.
   */
  async countCompleted(): Promise<number> {
    return this.repository.count({
      where: {
        status: TicketStatus.COMPLETED,
      },
    });
  }

  /**
   * Total revenue.
   */
  async getTotalRevenue(): Promise<number> {
    const tickets = await this.repository.find({
      where: {
        status: TicketStatus.COMPLETED,
      },
    });

    return tickets.reduce(
      (sum, ticket) => sum + Number(ticket.amount),
      0,
    );
  }

  /**
   * Today's revenue.
   */
  async getTodayRevenue(): Promise<number> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const tickets = await this.repository
      .createQueryBuilder('ticket')
      .where('ticket.status = :status', {
        status: TicketStatus.COMPLETED,
      })
      .andWhere(
        'ticket.exitTime BETWEEN :start AND :end',
        {
          start,
          end,
        },
      )
      .getMany();

    return tickets.reduce(
      (sum, ticket) => sum + Number(ticket.amount),
      0,
    );
  }

  /**
   * Find tickets between dates.
   */
  async findBetweenDates(
    startDate: Date,
    endDate: Date,
  ): Promise<ParkingTicket[]> {
    return this.repository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect(
        'ticket.vehicle',
        'vehicle',
      )
      .leftJoinAndSelect(
        'ticket.slot',
        'slot',
      )
      .where(
        'ticket.entryTime BETWEEN :startDate AND :endDate',
        {
          startDate,
          endDate,
        },
      )
      .orderBy(
        'ticket.entryTime',
        'DESC',
      )
      .getMany();
  }
}
