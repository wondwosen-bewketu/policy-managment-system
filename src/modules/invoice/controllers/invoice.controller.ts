import { Controller, Get, Param, Query } from '@nestjs/common';
import { InvoiceService } from '../services';
import { PaginationDto } from 'src/shared/pagination';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.invoiceService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(id);
  }
}
