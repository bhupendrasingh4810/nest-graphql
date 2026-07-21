import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({
  name: 'invoices',
})
export class Invoice {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  invoiceNumber!: string;

  @Field()
  @Column()
  ticketId!: number;

  @Field(() => Float)
  @Column('decimal')
  amount!: number;
}
