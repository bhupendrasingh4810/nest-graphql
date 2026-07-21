// ============================================================================
// src/modules/invoice/resolvers/invoice.resolver.ts
// ============================================================================

import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../entities/invoice.entity';

import { CreateInvoiceInput } from '../dto/create-invoice.input';

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Query(() => [Invoice])
  invoices(): Promise<Invoice[]> {
    return this.invoiceService.findAll();
  }

  @Query(() => Invoice)
  invoice(
    @Args('id', {
      type: () => Int,
    })
    id: number,
  ): Promise<Invoice> {
    return this.invoiceService.findOne(id);
  }

  @Query(() => Invoice)
  invoiceByTicket(
    @Args('ticketId', {
      type: () => Int,
    })
    ticketId: number,
  ): Promise<Invoice> {
    return this.invoiceService.findByTicket(ticketId);
  }

  @Mutation(() => Invoice)
  createInvoice(
    @Args('input')
    input: CreateInvoiceInput,
  ): Promise<Invoice> {
    return this.invoiceService.generate(input.ticketId, 0);
  }

  @Mutation(() => Boolean)
  deleteInvoice(
    @Args('id', {
      type: () => Int,
    })
    id: number,
  ): Promise<boolean> {
    return this.invoiceService.delete(id);
  }
}
