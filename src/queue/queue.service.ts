import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SharedBullConfigurationFactory } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService implements SharedBullConfigurationFactory {
  constructor(private configService: ConfigService) {}

  createSharedConfiguration() {
    return {
      connection: {
        host: this.configService.get('queue.host'),
        port: this.configService.get('queue.port'),
        password: this.configService.get('queue.password'),
      },
      defaultJobOptions: {
        removeOnComplete: true,
      },
    };
  }

  async getQueue(queueName: string): Promise<Queue> {
    const { host, port, password } = this.configService.get('queue');
    return new Queue(queueName, {
      connection: { host, port, password },
    });
  }
}
