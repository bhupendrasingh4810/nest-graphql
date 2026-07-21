import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PaymentService } from '../services/payment.service';
import { Payment } from '../entities/payment.entity';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Create a payment.
   * Normally called after a ticket is closed.
   */
  @Mutation(() => Payment)
  async makePayment(
    @Args('ticketId', { type: () => Int })
    ticketId: number,

    @Args('amount')
    amount: number,
  ): Promise<Payment> {
    return this.paymentService.pay(ticketId, amount);
  }

  /**
   * Get payment by id.
   */
  @Query(() => Payment, { nullable: true })
  async payment(
    @Args('id', { type: () => Int })
    id: number,
  ): Promise<Payment | null> {
    return this.paymentService.findById(id);
  }

  /**
   * Get all payments.
   */
  @Query(() => [Payment])
  async payments(): Promise<Payment[]> {
    return this.paymentService.findAll();
  }
}
