import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './services/payment.service';
import { PaymentResolver } from './resolvers/payment.resolver';
import { PaymentRepository } from './repositories/payment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [],
  providers: [PaymentService, PaymentResolver, PaymentRepository],
  exports: [PaymentService],
})
export class PaymentModule {}
