import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

import { PaymentStatus } from '../enums/payment-status.enum';

@Entity({
  name: 'payments',
})
@ObjectType()
export class Payment {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Float)
  @Column({
    type: 'decimal',
  })
  amount!: number;

  @Field()
  @Column()
  ticketId!: number;

  @Field(() => PaymentStatus)
  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status!: PaymentStatus;
}
