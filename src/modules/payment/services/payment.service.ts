import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { PaymentStatus } from '../enums/payment-status.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentService {
  constructor(@InjectRepository(Payment) private readonly repository: Repository<Payment>) {}

  async pay(
    ticketId: number,

    amount: number,
  ) {
    const payment = new Payment();

    payment.ticketId = ticketId;

    payment.amount = amount;

    /**
     * In real world:
     *
     * Razorpay
     * Stripe
     * PayPal
     *
     * integration here.
     */
    payment.status = PaymentStatus.SUCCESS;

    return this.repository.save(payment);
  }

  async findById(id: number): Promise<Payment | null> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<Payment[]> {
    return this.repository.find();
  }
}
