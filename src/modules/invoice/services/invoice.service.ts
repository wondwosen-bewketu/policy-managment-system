import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from '../../../database/entities';
import { Invoice } from '../../../database/entities/invoice.entity';
import { PricingService } from '../../pricing/pricing.service';
import { generateRandomString } from '../../../shared/helper';
import { addDays } from 'date-fns';
import {
  createPaginationResponse,
  PaginationDto,
  PaginationResponse,
} from '../../../shared/pagination';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly pricingService: PricingService,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async generateInvoice(policy: Policy): Promise<void> {
    try {
      const invoice = this.invoiceRepository.create({
        policy: policy,
        invoiceNumber: `INV-${generateRandomString(8)}`,
        amountDue: policy.premiumAmount,
        dueDate: addDays(new Date(), 30),
        status: 'PENDING',
      });

      await this.invoiceRepository.save(invoice);
      console.log('Invoice saved successfully!');
    } catch (error) {
      console.error('Error generating invoice:', error);
    }
  }

  async generateCanceledInvoice(policy: Policy): Promise<Invoice> {
    if (!policy || !policy.id) {
      throw new NotFoundException('Policy data is invalid or missing');
    }

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
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['policy'],
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return invoice;
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<Invoice>> {
    const { skip, limit } = paginationDto;
    const [data, total] = await this.invoiceRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return createPaginationResponse(
      data,
      total,
      paginationDto.page,
      paginationDto.limit,
    );
  }
}
