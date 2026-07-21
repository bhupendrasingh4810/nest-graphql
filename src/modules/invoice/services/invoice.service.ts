import { Injectable } from '@nestjs/common';
import { Invoice } from '../entities/invoice.entity';

@Injectable()
export class InvoiceService {
  generateInvoice(
    ticketId: number,

    amount: number,
  ) {
    const invoice = new Invoice();

    invoice.ticketId = ticketId;

    invoice.amount = amount;

    invoice.invoiceNumber = `INV-${Date.now()}`;

    return invoice;
  }
}
