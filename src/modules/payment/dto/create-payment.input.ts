// ============================================================================
// src/modules/payment/dto/create-payment.input.ts
// ============================================================================

import { Field, Float, InputType, Int } from '@nestjs/graphql';

import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

@InputType()
export class CreatePaymentInput {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  ticketId!: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  amount!: number;
}
