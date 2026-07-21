// ============================================================================
// src/modules/invoice/services/invoice.service.ts
// ============================================================================

import { Injectable, NotFoundException } from '@nestjs/common';

import { Invoice } from '../entities/invoice.entity';

import { InvoiceRepository } from '../repositories/invoice.repository';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async generate(ticketId: number, amount: number): Promise<Invoice> {
    const invoice = new Invoice();

    invoice.ticketId = ticketId;
    invoice.amount = amount;
    invoice.invoiceNumber = 'INV-' + Date.now();

    return this.invoiceRepository.save(invoice);
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceRepository.findAll();
  }

  async findOne(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findById(id);

    if (!invoice) {
      throw new NotFoundException('Invoice not found.');
    }

    return invoice;
  }

  async findByTicket(ticketId: number): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findByTicket(ticketId);

    if (!invoice) {
      throw new NotFoundException('Invoice not found.');
    }

    return invoice;
  }

  async delete(id: number): Promise<boolean> {
    await this.findOne(id);

    await this.invoiceRepository.delete(id);

    return true;
  }
}
