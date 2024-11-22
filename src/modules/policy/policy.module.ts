import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PolicyService } from './services/policy.service';
import { Invoice, Policy } from '../../database/entities';
import { InvoiceService } from '../invoice/services';
import { PricingModule } from '../pricing/pricing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Policy, Invoice]),
    EventEmitterModule.forRoot(),
    PricingModule,
  ],
  providers: [PolicyService, InvoiceService],
  exports: [PolicyService],
})
export class PolicyModule {}
