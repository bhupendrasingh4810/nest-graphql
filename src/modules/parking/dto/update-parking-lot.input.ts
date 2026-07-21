import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateParkingLotInput } from './create-parking-lot.input';
import { IsInt, Min } from 'class-validator';

/**
 * Update Parking Lot DTO.
 *
 * All fields become optional
 * because of PartialType.
 */
@InputType()
export class UpdateParkingLotInput extends PartialType(CreateParkingLotInput) {
  /**
   * Parking Lot Id.
   */
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id!: number;
}
