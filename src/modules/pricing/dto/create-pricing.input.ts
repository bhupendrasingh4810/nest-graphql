// ============================================================================
// src/modules/pricing/dto/create-pricing.input.ts
// ============================================================================

import { Field, Float, InputType } from '@nestjs/graphql';

import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';

import { VehicleType } from '../../vehicles/enums/vehicle-type.enum';

@InputType()
export class CreatePricingInput {
  /**
   * Vehicle Type
   */
  @Field(() => VehicleType)
  @IsEnum(VehicleType)
  vehicleType!: VehicleType;

  /**
   * Hourly Rate
   */
  @Field(() => Float)
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  hourlyRate!: number;
}
