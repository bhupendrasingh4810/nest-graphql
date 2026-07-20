import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from '@nestjs/common';


import {
    TicketService,
} from '../services/ticket.service';


import {
    CreateTicketInput,
} from '../dto/create-ticket.input';


import {
    CloseTicketInput,
} from '../dto/close-ticket.input';


import {
    JwtAuthGuard,
} from '../../auth/guards/jwt-auth.guard';


/**
 * REST Controller
 *
 * Parking ticket APIs.
 *
 * All business logic
 * is handled by TicketService.
 */
@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketController {


    constructor(

        /**
         * Ticket business layer.
         */
        private readonly ticketService:
            TicketService,

    ) { }



    /**
     * Create parking ticket.
     *
     * POST
     *
     * /tickets
     */
    @Post()
    async createTicket(

        @Body()
        input: CreateTicketInput,

    ) {


        return this.ticketService.createTicket(
            input,
        );

    }



    /**
     * Close parking ticket.
     *
     * POST
     *
     * /tickets/close
     */
    @Post('close')
    async closeTicket(

        @Body()
        input: CloseTicketInput,

    ) {


        return this.ticketService.closeTicket(
            input,
        );

    }



    /**
     * Get ticket details.
     *
     * GET
     *
     * /tickets/:id
     */
    @Get(':id')
    async findById(

        @Param(
            'id',
            ParseIntPipe,
        )
        id: number,

    ) {


        return this.ticketService.findById(
            id,
        );

    }

}