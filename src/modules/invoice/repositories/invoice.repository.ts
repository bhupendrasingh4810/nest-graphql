// ============================================================================
// src/modules/invoice/repositories/invoice.repository.ts
// ============================================================================

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Invoice } from '../entities/invoice.entity';

@Injectable()
export class InvoiceRepository {
  constructor(
    @InjectRepository(Invoice)
    private readonly repository: Repository<Invoice>,
  ) {}

  save(invoice: Invoice): Promise<Invoice> {
    return this.repository.save(invoice);
  }

  findAll(): Promise<Invoice[]> {
    return this.repository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  findById(id: number): Promise<Invoice | null> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  findByTicket(ticketId: number): Promise<Invoice | null> {
    return this.repository.findOne({
      where: {
        ticketId,
      },
    });
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
