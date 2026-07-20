import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingTicket } from './entities/parking-ticket.entity';
import { TicketResolver } from './resolvers/ticket.resolver';
import { TicketRepository } from './repositories/ticket.repository';
import { TicketService } from './services/ticket.service';
import { TicketController } from './controllers/ticket.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ParkingTicket,
        ]),
    ],
    controllers: [
        TicketController
    ],
    providers: [
        TicketRepository,
        TicketService,
        TicketResolver
    ],
    exports: [
        TicketService
    ]
})
export class TicketsModule { }
