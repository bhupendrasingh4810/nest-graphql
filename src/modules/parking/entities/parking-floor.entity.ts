import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import {
    Field,
    ID,
    Int,
    ObjectType,
} from '@nestjs/graphql';

import { ParkingLot } from './parking-lot.entity';
import { ParkingZone } from './parking-zone.entity';
import { ParkingSlot } from './parking-slot.entity';

/**
 * Represents one floor.
 *
 * Example:
 *
 * Basement -1
 * Ground Floor
 * Floor 1
 * Floor 2
 */
@Entity({
    name: 'parking_floors',
})
@ObjectType()
export class ParkingFloor {
    /**
     * Primary key.
     */
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    /**
     * Floor number.
     */
    @Field(() => Int)
    @Column()
    floorNumber!: number;

    /**
     * Display name.
     */
    @Field()
    @Column({
        length: 100,
    })
    name!: string;

    /**
     * Display order.
     */
    @Field(() => Int)
    @Column()
    displayOrder!: number;

    /**
     * Parent parking lot.
     */
    @ManyToOne(
        () => ParkingLot,
        (parkingLot: ParkingLot) => parkingLot.floors,
        {
            nullable: false,
            onDelete: 'CASCADE',
        },
    )
    parkingLot!: ParkingLot;

    /**
     * Zones on this floor.
     */
    @OneToMany(
        () => ParkingZone,
        (zone: ParkingZone) => zone.floor,
    )
    zones!: ParkingZone[];

    /**
     * Floor contains many slots.
     */
    @OneToMany(

        () => ParkingSlot,

        slot => slot.floor,

    )
    slots!: ParkingSlot[];

    /**
 * Parent parking lot.
 */
    @ManyToOne(
        () => ParkingLot,
        lot => lot.floors,
    )
    lot!: ParkingLot;

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