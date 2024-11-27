import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { PolicyService } from '../services';
import { InvoiceService } from '../../invoice/services';

@Injectable()
export class InvoiceGenerationTask {
  constructor(
    private readonly policyService: PolicyService,
    private readonly invoiceService: InvoiceService,
    @InjectQueue('invoiceQueue') private readonly invoiceQueue: Queue,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_6PM)
  async generateInvoicesForActivePolicies() {
    console.log('Running daily invoice generation task');

    try {
      const policies = await this.policyService.getPoliciesToGenerateInvoice();

      for (const policy of policies) {
        await this.invoiceQueue.add('generateInvoice', { policyId: policy.id });
        console.log(
          `Invoice generation task added for policy: ${policy.policyNumber}`,
        );
      }
    } catch (error) {
      console.error('Failed to generate invoices for active policies:', error);
    }
  }
}
