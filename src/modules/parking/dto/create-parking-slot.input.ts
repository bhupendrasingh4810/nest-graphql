import { Field, InputType, Int } from '@nestjs/graphql';

import { IsInt, IsString } from 'class-validator';

@InputType()
export class CreateSlotInput {
  /**
   * Floor id.
   */
  @Field(() => Int)
  @IsInt()
  floorId!: number;

  /**
   * Slot number.
   *
   * Example:
   *
   * A-101
   */
  @Field()
  @IsString()
  slotNumber!: string;
}
