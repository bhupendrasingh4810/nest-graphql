import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingTicket } from './entities/parking-ticket.entity';
import { TicketResolver } from './resolvers/ticket.resolver';
import { TicketRepository } from './repositories/ticket.repository';
import { TicketService } from './services/ticket.service';
import { TicketController } from './controllers/ticket.controller';
import { ParkingModule } from '../parking/parking.module';
import { PricingModule } from '../pricing/pricing.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { PaymentModule } from '../payment/payment.module';
import { InvoiceModule } from '../invoice/invoice.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ParkingTicket,
        ]),
        /**
         * Allows TicketService
         * to use ParkingService.
         */
        ParkingModule,
        PricingModule,
        VehiclesModule,
        PaymentModule,
        InvoiceModule
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
