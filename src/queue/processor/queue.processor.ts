import { Processor, Process, OnQueueError, OnQueueFailed } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { QueuePayload } from './types';

@Processor() // Automatically handles all queues registered
export class QueueProcessor {
  private readonly logger = new Logger(QueueProcessor.name);

  @Process('*') // Catch-all process handler
  async handleJob(job: Job<QueuePayload>): Promise<void> {
    this.logger.log(`Processing job in queue "${job.queue.name}":`, job.data);
    try {
      // Process logic here based on job type
      if (job.data.jobType === 'email') {
        this.handleEmailJob(job.data);
      }
    } catch (error) {
      this.logger.error(
        `Error processing job in queue "${job.queue.name}"`,
        error.stack,
      );
      throw error; // Ensure retry
    }
  }

  private handleEmailJob(data: any) {
    this.logger.log('Handling email job:', data);
    // Logic to handle email jobs
  }

  @OnQueueError()
  handleQueueError(error: Error) {
    this.logger.error('Queue Error:', error.message);
  }

  @OnQueueFailed()
  handleQueueFailed(job: Job, error: Error) {
    this.logger.error(`Job failed in queue "${job.queue.name}":`, error.stack);
  }
}
