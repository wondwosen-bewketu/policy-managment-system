// src/policy/policy.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PolicyService } from './services/policy.service';
import { Invoice, Policy } from '../../database/entities';
import { PricingModule } from '../pricing/pricing.module';
import { PolicyController } from './controllers';
import { EmailService } from './email.service';
import { PolicyListener, PolicyEmailHandler } from './listeners';
import { InvoiceService } from '../invoice/services';
import { InvoiceProcessor } from './jobs/invoice.processer';
import { InvoiceGenerationTask } from './tasks';

@Module({
  imports: [
    TypeOrmModule.forFeature([Policy, Invoice]),
    EventEmitterModule.forRoot(),
    PricingModule,
    BullModule.registerQueue(
      {
        name: 'invoiceQueue',
      },
      {
        name: 'emailQueue',
      },
    ),
  ],
  providers: [
    PolicyService,
    EmailService,
    PolicyListener,
    PolicyEmailHandler,
    InvoiceService,
    InvoiceProcessor,
    InvoiceGenerationTask,
  ],
  controllers: [PolicyController],
})
export class PolicyModule {}
