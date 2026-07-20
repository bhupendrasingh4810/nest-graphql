import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import {
    Field,
    ID,
    ObjectType,
} from '@nestjs/graphql';

import { ParkingFloor } from './parking-floor.entity';
import { ParkingLotStatus } from '../enums/parking-lot-status.enum';

/**
 * Represents one physical parking location.
 *
 * Examples:
 *
 * Phoenix Mall Parking
 * Airport Terminal 3 Parking
 * Lulu Mall Parking
 */
@Entity({
    name: 'parking_lots',
})
@ObjectType()
export class ParkingLot {
    /**
     * Primary key.
     */
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    /**
     * Parking lot name.
     */
    @Field()
    @Column({
        length: 150,
    })
    name!: string;

    /**
     * Short code.
     *
     * Example:
     * PM01
     * AIRPORT-T3
     */
    @Field()
    @Column({
        unique: true,
        length: 30,
    })
    code!: string;

    /**
     * Street address.
     */
    @Field()
    @Column({
        length: 300,
    })
    address!: string;

    /**
     * City.
     */
    @Field()
    @Column({
        length: 100,
    })
    city!: string;

    /**
     * State.
     */
    @Field()
    @Column({
        length: 100,
    })
    state!: string;

    /**
     * Country.
     */
    @Field()
    @Column({
        length: 100,
    })
    country!: string;

    /**
     * Postal code.
     */
    @Field()
    @Column({
        length: 20,
    })
    postalCode!: string;

    /**
     * Latitude.
     */
    @Field()
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 7,
    })
    latitude!: number;

    /**
     * Longitude.
     */
    @Field()
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 7,
    })
    longitude!: number;

    /**
     * Operational status.
     */
    @Field(() => ParkingLotStatus)
    @Column({
        type: 'enum',
        enum: ParkingLotStatus,
        default: ParkingLotStatus.ACTIVE,
    })
    status!: ParkingLotStatus;

    /**
     * Floors belonging to this parking lot.
     */
    @OneToMany(
        () => ParkingFloor,
        (floor: ParkingFloor) => floor.parkingLot,
    )
    floors!: ParkingFloor[];

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