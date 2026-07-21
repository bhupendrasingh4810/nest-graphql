import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'invoices'
})
export class Invoice {


    @PrimaryGeneratedColumn()
    id!: number;


    @Column()
    ticketId!: number;


    @Column()
    invoiceNumber!: string;


    @Column({
        type: 'decimal'
    })
    amount!: number;


}