import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from '../../database/entities';
import { InvoiceService } from './services';
import { InvoiceController } from './controllers';
import { PricingModule } from '../pricing/pricing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]), // Registers InvoiceRepository
    PricingModule,
  ],
  providers: [InvoiceService], // Provides InvoiceService
  controllers: [InvoiceController], // Handles routes
  exports: [InvoiceService, TypeOrmModule], // Export InvoiceService and TypeOrmModule
})
export class InvoiceModule {}
