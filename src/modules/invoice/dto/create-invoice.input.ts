// ============================================================================
// src/modules/invoice/dto/create-invoice.input.ts
// ============================================================================

import { Field, InputType, Int } from '@nestjs/graphql';

import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateInvoiceInput {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  ticketId!: number;
}
