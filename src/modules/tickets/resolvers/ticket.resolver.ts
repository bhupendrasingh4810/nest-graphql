import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { TicketService } from '../services/ticket.service';

import { ParkingTicket } from '../entities/parking-ticket.entity';

import { CreateTicketInput } from '../dto/create-ticket.input';

import { CloseTicketInput } from '../dto/close-ticket.input';

/**
 * GraphQL Resolver
 *
 * Handles:
 *
 * Queries
 * Mutations
 *
 * for parking tickets.
 */
@Resolver(() => ParkingTicket)
export class TicketResolver {
  constructor(
    /**
     * Ticket business layer.
     */
    private readonly ticketService: TicketService,
  ) {}

  /**
   * Create parking ticket.
   *
   * Mutation:
   *
   * createTicket(
   *   input:{
   *      vehicleId:1,
   *      slotId:2
   *   }
   * )
   */
  @Mutation(() => ParkingTicket)
  async createTicket(
    @Args('input', {
      type: () => CreateTicketInput,
    })
    input: CreateTicketInput,
  ): Promise<ParkingTicket> {
    return this.ticketService.createTicket(input);
  }

  /**
   * Close parking ticket.
   *
   * Mutation:
   *
   * closeTicket(
   *    input:{
   *       ticketId:1
   *    }
   * )
   */
  @Mutation(() => ParkingTicket)
  async closeTicket(
    @Args('input', {
      type: () => CloseTicketInput,
    })
    input: CloseTicketInput,
  ): Promise<ParkingTicket> {
    return this.ticketService.closeTicket(input);
  }

  /**
   * Get ticket by id.
   *
   * Query:
   *
   * ticket(id:1)
   */
  @Query(() => ParkingTicket, {
    nullable: true,
  })
  async ticket(
    @Args('id', {
      type: () => Int,
    })
    id: number,
  ): Promise<ParkingTicket | null> {
    return this.ticketService.findById(id);
  }

  @Query(() => [ParkingTicket])
  tickets() {
    return this.ticketService.findAll();
  }

  @Query(() => [ParkingTicket])
  vehicleHistory(
    @Args('vehicleId', {
      type: () => Int,
    })
    vehicleId: number,
  ) {
    return this.ticketService.findVehicleHistory(vehicleId);
  }

  @Query(() => [ParkingTicket])
  activeTickets() {
    return this.ticketService.findActiveTickets();
  }
}
