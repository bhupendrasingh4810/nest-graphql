import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingTicket } from './entities/parking-ticket.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ParkingTicket,
        ]),
    ],
})
export class TicketsModule { }
