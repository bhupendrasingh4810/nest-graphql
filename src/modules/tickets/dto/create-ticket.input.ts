import { Field, InputType, Int } from '@nestjs/graphql';

import { IsInt, Min } from 'class-validator';

@InputType()
export class CreateTicketInput {
  /**
   * Vehicle id.
   */
  @Field(() => Int)
  @IsInt()
  @Min(1)
  vehicleId!: number;

  /**
   * Parking slot id.
   */
  @Field(() => Int)
  @IsInt()
  @Min(1)
  slotId!: number;
}
