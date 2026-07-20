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
    ObjectType,
} from '@nestjs/graphql';

import { User } from '../../users/entities/user.entity';
import { ParkingTicket } from '../../tickets/entities/parking-ticket.entity';
import { VehicleType } from '../enums/vehicle-type.enum';
import { VehicleStatus } from '../enums/vehicle-status.enum';

/**
 * Represents one registered vehicle.
 */
@Entity({
    name: 'vehicles',
})
@ObjectType()
export class Vehicle {
    /**
     * Primary key.
     */
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    /**
     * Vehicle registration number.
     *
     * Example:
     * UP32AB1234
     */
    @Field()
    @Column({
        unique: true,
        length: 20,
    })
    registrationNumber!: string;

    /**
     * Vehicle manufacturer.
     */
    @Field()
    @Column({
        length: 100,
    })
    manufacturer!: string;

    /**
     * Vehicle model.
     */
    @Field()
    @Column({
        length: 100,
    })
    model!: string;

    /**
     * Vehicle color.
     */
    @Field()
    @Column({
        length: 50,
    })
    color!: string;

    /**
     * Vehicle type.
     */
    @Field(() => VehicleType)
    @Column({
        type: 'enum',
        enum: VehicleType,
    })
    type!: VehicleType;

    /**
     * Active / inactive.
     */
    @Field(() => VehicleStatus)
    @Column({
        type: 'enum',
        enum: VehicleStatus,
        default: VehicleStatus.ACTIVE,
    })
    status!: VehicleStatus;

    /**
     * Vehicle owner.
     */
    @ManyToOne(
        () => User,
        {
            nullable: false,
            onDelete: 'CASCADE',
        },
    )
    owner!: User;

    /**
     * Parking history.
     */
    @OneToMany(
        () => ParkingTicket,
        (ticket: ParkingTicket) => ticket.vehicle,
    )
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