import { Injectable } from '@nestjs/common';
import { InvoiceService } from '../../invoice/services/invoice.service';
import { PolicyService } from '../services';
import { PolicyEvents } from '../events/policy.events';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaginationDto } from '../../../shared/pagination'; // Import the PaginationDto

@Injectable()
export class PolicyJobService {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly policyService: PolicyService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * Process the invoices for all approved policies.
   */
  async processScheduledInvoices(paginationDto: PaginationDto) {
    const policies = await this.policyService.findAll(paginationDto); // Pass paginationDto
    if (!policies || !policies.data || policies.data.length === 0) {
      console.log('No policies found for invoice processing.');
      return;
    }

    for (const policy of policies.data) {
      if (policy.isActive) {
        // Check if the policy is active
        await this.createInvoiceForPolicy(policy);
      }
    }
  }

  /**
   * Create an invoice for a policy.
   * @param policy The approved policy
   */
  private async createInvoiceForPolicy(policy) {
    try {
      const invoice = await this.invoiceService.generateInvoice(policy);
      this.eventEmitter.emit(PolicyEvents.INVOICE_GENERATED, invoice);
      console.log(`Invoice generated for policy ${policy.id}`);
    } catch (error) {
      console.error(
        `Failed to generate invoice for policy ${policy.id}: ${error.message}`,
      );
    }
  }
}
