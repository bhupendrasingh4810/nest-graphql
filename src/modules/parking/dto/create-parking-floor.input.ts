import { Field, InputType, Int } from '@nestjs/graphql';

import { IsInt, Min } from 'class-validator';

@InputType()
export class CreateFloorInput {
  /**
   * Parking lot id.
   */
  @Field(() => Int)
  @IsInt()
  @Min(1)
  parkingLotId!: number;

  /**
   * Floor number.
   */
  @Field(() => Int)
  @IsInt()
  floorNumber!: number;
}
