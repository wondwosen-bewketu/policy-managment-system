import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SharedBullConfigurationFactory } from '@nestjs/bullmq';
import { ConfigType } from '../config/types';

@Injectable()
export class QueueService implements SharedBullConfigurationFactory {
  constructor(private configService: ConfigService<ConfigType>) {}

  createSharedConfiguration() {
    return {
      connection: {
        host: this.configService.get('queue.host', { infer: true }),
        port: this.configService.get('queue.port', { infer: true }),
        username: this.configService.get('queue.username', { infer: true }),
        password: this.configService.get('queue.password', { infer: true }),
        db: this.configService.get('queue.db', { infer: true }),
      },
    };
  }
}
