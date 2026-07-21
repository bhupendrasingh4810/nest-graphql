// ============================================================================
// src/modules/invoice/controllers/invoice.controller.ts
// ============================================================================

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

import { InvoiceService } from '../services/invoice.service';

import { CreateInvoiceDto } from '../dto/create-invoice.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(
    @Body()
    dto: CreateInvoiceDto,
  ) {
    // Amount should normally come from Ticket/Payment
    return this.invoiceService.generate(dto.ticketId, 0);
  }

  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.invoiceService.findOne(id);
  }

  @Get('ticket/:ticketId')
  findByTicket(
    @Param('ticketId', ParseIntPipe)
    ticketId: number,
  ) {
    return this.invoiceService.findByTicket(ticketId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.invoiceService.delete(id);
  }
}
