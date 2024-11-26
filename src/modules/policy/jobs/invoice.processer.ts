import { Injectable } from '@nestjs/common';
import { Processor } from '@nestjs/bullmq';
import { InvoiceService } from '../../invoice/services';
import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Injectable()
@Processor('invoiceQueue')
export class InvoiceProcessor extends WorkerHost {
  constructor(private readonly invoiceService: InvoiceService) {
    super();
  }

  async process(job: Job): Promise<any> {
    const policy = job.data;

    console.log('Job received:', job.id);

    if (!policy) {
      throw new Error('Policy data is missing for invoice generation');
    }

    console.log(
      'Processing invoice generation for policy:',
      policy.policyNumber,
    );

    try {
      const invoice = await this.invoiceService.generateInvoice(policy);
      console.log('Invoice successfully generated');
      return invoice;
    } catch (error) {
      console.error('Failed to generate invoice:', error.message);
      throw error;
    }
  }
}
