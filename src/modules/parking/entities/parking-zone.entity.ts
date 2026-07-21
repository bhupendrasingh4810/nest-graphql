import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Field, ID, ObjectType } from '@nestjs/graphql';

import { ParkingFloor } from './parking-floor.entity';
import { ParkingSlot } from './parking-slot.entity';
import { ParkingZoneType } from '../enums/parking-zone-type.enum';

/**
 * Represents a logical area inside a floor.
 *
 * Example:
 *
 * Floor 1
 *   ├── Zone A
 *   ├── Zone B
 *   └── VIP
 */
@Entity({
  name: 'parking_zones',
})
@ObjectType()
export class ParkingZone {
  /**
   * Primary key.
   */
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Zone code.
   *
   * Example:
   * A
   * B
   * VIP
   * EV
   */
  @Field()
  @Column({
    length: 30,
  })
  code!: string;

  /**
   * Display name.
   */
  @Field()
  @Column({
    length: 100,
  })
  name!: string;

  /**
   * Zone type.
   */
  @Field(() => ParkingZoneType)
  @Column({
    type: 'enum',
    enum: ParkingZoneType,
    default: ParkingZoneType.STANDARD,
  })
  type!: ParkingZoneType;

  /**
   * Parent floor.
   */
  @ManyToOne(() => ParkingFloor, (floor: ParkingFloor) => floor.zones, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  floor!: ParkingFloor;

  /**
   * Parking slots inside this zone.
   */
  @OneToMany(() => ParkingSlot, (slot: ParkingSlot) => slot.zone)
  slots!: ParkingSlot[];

  /**
   * Created timestamp.
   */
  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  /**
   * Updated timestamp.
   */
  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
