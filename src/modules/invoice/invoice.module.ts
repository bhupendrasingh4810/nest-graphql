import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceService } from './services/invoice.service';
import { InvoiceRepository } from './repositories/invoice.repository';
import { InvoiceResolver } from './resolvers/invoice.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],

  providers: [InvoiceService, InvoiceResolver, InvoiceRepository],

  exports: [InvoiceService],
})
export class InvoiceModule {}
