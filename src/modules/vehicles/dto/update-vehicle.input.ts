// ============================================================================
// src/modules/vehicle/dto/update-vehicle.input.ts
// ============================================================================

import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateVehicleInput } from './create-vehicle.input';

@InputType()
export class UpdateVehicleInput extends PartialType(CreateVehicleInput) {
  /**
   * Registration Number
   */
  @Field({ nullable: true })
  registrationNumber?: string;

  /**
   * Manufacturer
   */
  @Field({ nullable: true })
  manufacturer?: string;

  /**
   * Model
   */
  @Field({ nullable: true })
  model?: string;

  /**
   * Color
   */
  @Field({ nullable: true })
  color?: string;
}
