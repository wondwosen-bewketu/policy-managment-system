import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { InvoiceService } from './services';
import { PolicyService } from '../policy/services';

@Processor('invoice')
@Injectable()
export class InvoiceProcessor {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly policyService: PolicyService,
  ) {}

  @Process('generateInvoice')
  async handleGenerateInvoice(job: Job<{ policyId: string }>) {
    const { policyId } = job.data;

    const policy = await this.policyService.findOne(policyId);

    await this.invoiceService.generateInvoice(policy);
    console.log(`Invoice generated for policy: ${policyId}`);
  }
}
