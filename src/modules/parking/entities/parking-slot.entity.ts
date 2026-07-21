import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

import { ParkingZone } from './parking-zone.entity';
import { ParkingSlotStatus } from '../enums/parking-slot-status.enum';
import { ParkingSlotType } from '../enums/parking-slot-type.enum';
import { ParkingTicket } from 'src/modules/tickets/entities/parking-ticket.entity';
import { ParkingFloor } from './parking-floor.entity';

/**
 * Represents a single parking slot.
 *
 * Example:
 *
 * A-001
 * A-002
 * VIP-001
 * EV-010
 */
@Entity({
  name: 'parking_slots',
})
@ObjectType()
export class ParkingSlot {
  /**
   * Primary key.
   */
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Visible slot number.
   */
  @Field()
  @Column({
    unique: true,
    length: 30,
  })
  slotNumber!: string;

  /**
   * Slot type.
   */
  @Field(() => ParkingSlotType)
  @Column({
    type: 'enum',
    enum: ParkingSlotType,
  })
  type!: ParkingSlotType;

  /**
   * Current slot status.
   */
  @Field(() => ParkingSlotStatus)
  @Column({
    type: 'enum',
    enum: ParkingSlotStatus,
    default: ParkingSlotStatus.AVAILABLE,
  })
  status!: ParkingSlotStatus;

  /**
   * Whether the slot is enabled.
   */
  @Field()
  @Column({
    default: true,
  })
  isEnabled!: boolean;

  /**
   * EV charger available.
   */
  @Field()
  @Column({
    default: false,
  })
  hasChargingStation!: boolean;

  /**
   * Maximum supported vehicle height (meters).
   */
  @Field(() => Float)
  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
    default: 2.5,
  })
  maximumHeight!: number;

  /**
   * Floor relation.
   */
  @ManyToOne(
    () => ParkingFloor,

    (floor) => floor.slots,

    {
      nullable: false,
    },
  )
  floor!: ParkingFloor;
  /**
   * Parent zone.
   */
  @ManyToOne(() => ParkingZone, (zone: ParkingZone) => zone.slots, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  zone!: ParkingZone;

  /**
   * Parking sessions that used this slot.
   */
  @OneToMany(() => ParkingTicket, (ticket: ParkingTicket) => ticket.slot)
  tickets!: ParkingTicket[];
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
