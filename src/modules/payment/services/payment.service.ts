// ============================================================================
// src/modules/payment/services/payment.service.ts
// ============================================================================

import { Injectable, NotFoundException } from '@nestjs/common';

import { PaymentRepository } from '../repositories/payment.repository';

import { Payment } from '../entities/payment.entity';

import { PaymentStatus } from '../enums/payment-status.enum';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async pay(ticketId: number, amount: number): Promise<Payment> {
    const payment = new Payment();

    payment.ticketId = ticketId;
    payment.amount = amount;

    /**
     * Replace with
     * Razorpay / Stripe later.
     */
    payment.status = PaymentStatus.SUCCESS;

    return this.paymentRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.findAll();
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findById(id);

    if (!payment) {
      throw new NotFoundException('Payment not found.');
    }

    return payment;
  }

  async findById(id: number): Promise<Payment | null> {
    return this.findOne(id);
  }

  async findByTicket(ticketId: number): Promise<Payment> {
    const payment = await this.paymentRepository.findByTicket(ticketId);

    if (!payment) {
      throw new NotFoundException('Payment not found.');
    }

    return payment;
  }

  async delete(id: number): Promise<boolean> {
    await this.findOne(id);

    await this.paymentRepository.delete(id);

    return true;
  }
}
