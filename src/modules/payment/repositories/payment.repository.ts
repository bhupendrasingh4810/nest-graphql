// ============================================================================
// src/modules/payment/repositories/payment.repository.ts
// ============================================================================

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Payment } from '../entities/payment.entity';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly repository: Repository<Payment>,
  ) {}

  async save(payment: Payment): Promise<Payment> {
    return this.repository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.repository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async findById(id: number): Promise<Payment | null> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async findByTicket(ticketId: number): Promise<Payment | null> {
    return this.repository.findOne({
      where: {
        ticketId,
      },
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
