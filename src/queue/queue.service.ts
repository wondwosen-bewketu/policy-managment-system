import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Logger } from '@nestjs/common';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);

  constructor(@InjectQueue() private readonly queues: Record<string, Queue>) {}

  /**
   * Adds a job to the specified queue.
   * @param queueName The name of the queue.
   * @param jobType The type of job.
   * @param data The job payload.
   */
  async addJob(queueName: string, jobType: string, data: any): Promise<void> {
    const queue = this.getQueue(queueName);
    if (!queue) {
      throw new Error(`Queue "${queueName}" is not registered.`);
    }
    await queue.add(jobType, data, {
      attempts: 3, // Retry up to 3 times on failure
      backoff: 5000, // Retry after 5 seconds
    });
    this.logger.log(`Added job to queue: ${queueName}, Type: ${jobType}`);
  }

  /**
   * Retrieves the queue instance by name.
   * @param queueName The name of the queue.
   */
  private getQueue(queueName: string): Queue | undefined {
    return this.queues[queueName];
  }
}
