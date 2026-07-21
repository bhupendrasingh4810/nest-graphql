// ============================================================================
// src/modules/vehicle/dto/create-vehicle.input.ts
// ============================================================================

import { Field, InputType } from '@nestjs/graphql';

import { IsEnum, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from 'class-validator';

import { VehicleType } from '../enums/vehicle-type.enum';

@InputType()
export class CreateVehicleInput {
  /**
   * Registration Number
   * Example: UP32AB1234
   */
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  registrationNumber!: string;

  /**
   * Vehicle Type
   */
  @Field(() => VehicleType)
  @IsEnum(VehicleType)
  type!: VehicleType;

  /**
   * Manufacturer
   * Example: Honda
   */
  @Field()
  @IsString()
  @MaxLength(100)
  manufacturer!: string;

  /**
   * Model
   */
  @Field()
  @IsString()
  @MaxLength(100)
  model!: string;

  /**
   * Color
   */
  @Field()
  @IsString()
  @MaxLength(50)
  color!: string;

  /**
   * Owner Id
   */
  @Field({ nullable: true })
  @IsOptional()
  ownerId?: number;
}
