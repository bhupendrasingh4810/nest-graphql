import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { VehicleType } from 'src/modules/vehicles/enums/vehicle-type.enum';

@Entity({
  name: 'parking_prices',
})
@ObjectType()
export class ParkingPrice {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Vehicle category.
   */
  @Field(() => VehicleType)
  @Column({
    type: 'enum',

    enum: VehicleType,
  })
  vehicleType!: VehicleType;

  /**
   * Price per hour.
   */
  @Field(() => Float)
  @Column({
    type: 'decimal',

    precision: 10,

    scale: 2,
  })
  hourlyRate!: number;

  @Field()
  @Column({
    default: true,
  })
  active!: boolean;
}
