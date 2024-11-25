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
import { PolicyJobService } from './jobs';
import { TaskService } from './tasks/task.service';
import { InvoiceService } from '../invoice/services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Policy, Invoice]),
    EventEmitterModule.forRoot(),
    PricingModule,
    BullModule.registerQueue({
      name: 'invoice',
    }),
  ],
  providers: [
    PolicyService,
    EmailService,
    PolicyListener,
    PolicyEmailHandler,
    PolicyJobService,
    TaskService,
    InvoiceService,
  ],
  controllers: [PolicyController],
})
export class PolicyModule {}
