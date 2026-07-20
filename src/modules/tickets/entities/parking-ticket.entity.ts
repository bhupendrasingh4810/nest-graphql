import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import {
    Field,
    Float,
    ID,
    ObjectType,
} from '@nestjs/graphql';

import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { ParkingSlot } from '../../parking/entities/parking-slot.entity';
import { TicketStatus } from '../enums/ticket-status.enum';

/**
 * Represents one parking session.
 */
@Entity({
    name: 'parking_tickets',
})
@ObjectType()
export class ParkingTicket {
    /**
     * Primary key.
     */
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    /**
     * Ticket number.
     */
    @Field()
    @Column({
        unique: true,
        length: 30,
    })
    ticketNumber!: string;

    /**
     * Vehicle.
     */
    @ManyToOne(
        () => Vehicle,
        (vehicle: Vehicle) => vehicle.tickets,
        {
            nullable: false,
        },
    )
    vehicle!: Vehicle;

    /**
     * Assigned slot.
     */
    @ManyToOne(
        () => ParkingSlot,
        {
            nullable: false,
        },
    )
    slot!: ParkingSlot;

    /**
     * Entry time.
     */
    @Field()
    @Column({
        type: 'timestamp',
    })
    entryTime!: Date;

    /**
     * Exit time.
     */
    @Field({
        nullable: true,
    })
    @Column({
        type: 'timestamp',
        nullable: true,
    })
    exitTime?: Date;

    /**
     * Parking duration in minutes.
     */
    @Field()
    @Column({
        default: 0,
    })
    duration!: number;

    /**
     * Parking fee.
     */
    @Field(() => Float)
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0,
    })
    totalAmount!: number;

    /**
     * Current status.
     */
    @Field(() => TicketStatus)
    @Column({
        type: 'enum',
        enum: TicketStatus,
        default: TicketStatus.ACTIVE,
    })
    status!: TicketStatus;

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