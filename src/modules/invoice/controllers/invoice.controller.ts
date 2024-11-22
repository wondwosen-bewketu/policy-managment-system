import { Controller, Get, Param } from '@nestjs/common';
import { InvoiceService } from '../services';
import { Invoice } from '../../../database/entities/invoice.entity';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  async findAll(): Promise<Invoice[]> {
    return await this.invoiceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(id);
  }
}
