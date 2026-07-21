// ============================================================================
// src/modules/payment/controllers/payment.controller.ts
// ============================================================================

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

import { PaymentService } from '../services/payment.service';

import { CreatePaymentDto } from '../dto/create-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(
    @Body()
    dto: CreatePaymentDto,
  ) {
    return this.paymentService.pay(dto.ticketId, dto.amount);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.paymentService.findOne(id);
  }

  @Get('ticket/:ticketId')
  findByTicket(
    @Param('ticketId', ParseIntPipe)
    ticketId: number,
  ) {
    return this.paymentService.findByTicket(ticketId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.paymentService.delete(id);
  }
}
