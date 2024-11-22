import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from '../../../database/entities';
import { Invoice } from '../../../database/entities/invoice.entity';
import { PricingService } from '../../pricing/pricing.service';
import { generateRandomString } from '../../../shared/helper';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly pricingService: PricingService,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async generateInvoice(policy: Policy): Promise<Invoice> {
    const premiumAmount = this.pricingService.calculatePremium(
      policy.paymentFrequency,
      policy.coverageAmount,
    );

    const invoice = new Invoice();
    invoice.invoiceNumber = `INV-${generateRandomString(8)}`;
    invoice.amountDue = premiumAmount;
    invoice.dueDate = policy.startDate;
    invoice.status = 'PENDING';
    invoice.policy = policy;

    return await this.invoiceRepository.save(invoice);
  }

  async generatePausedInvoice(policy: Policy): Promise<Invoice> {
    const premiumAmount = this.pricingService.calculatePremium(
      policy.paymentFrequency,
      policy.coverageAmount,
    );

    const invoice = new Invoice();
    invoice.invoiceNumber = `INV-${generateRandomString(8)}`;
    invoice.amountDue = premiumAmount;
    invoice.dueDate = new Date();
    invoice.status = 'PAUSED';
    invoice.policy = policy;

    return await this.invoiceRepository.save(invoice);
  }

  async generateCanceledInvoice(policy: Policy): Promise<Invoice> {
    const premiumAmount = this.pricingService.calculatePremium(
      policy.paymentFrequency,
      policy.coverageAmount,
    );

    const invoice = new Invoice();
    invoice.invoiceNumber = `INV-${generateRandomString(8)}`;
    invoice.amountDue = premiumAmount;
    invoice.dueDate = new Date();
    invoice.status = 'CANCELED';
    invoice.policy = policy;

    return await this.invoiceRepository.save(invoice);
  }

  async findOne(id: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOneBy({ id });
    if (!invoice) {
      throw new NotFoundException(`invoice with ID ${id} not found`);
    }
    return invoice;
  }

  async findAll(): Promise<Invoice[]> {
    return await this.invoiceRepository.find();
  }
}
