import { Injectable } from '@nestjs/common';
import { PolicyJobService } from '../jobs'; // Import PolicyJobService
import { PaginationDto } from '../../../shared/pagination'; // Import PaginationDto

@Injectable()
export class TaskService {
  constructor(
    private readonly policyJobService: PolicyJobService, // Inject PolicyJobService
  ) {}

  /**
   * Executes the scheduled task to process invoices for active policies.
   */
  async executeScheduledTasks(paginationDto: PaginationDto) {
    try {
      console.log('Starting the task to process scheduled invoices...');

      // Delegate the invoice processing task to PolicyJobService
      await this.policyJobService.processScheduledInvoices(paginationDto);

      console.log('Scheduled invoices processed successfully.');
    } catch (error) {
      console.error('Error during scheduled task execution:', error.message);
    }
  }
}
