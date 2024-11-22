import { Module, DynamicModule } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './queue.service';
import { QueueProcessor } from './processor/queue.processor';
import { DEFAULT_QUEUE_OPTIONS } from './queue.constants';

@Module({})
export class QueueModule {
  static register(queueNames: string[]): DynamicModule {
    const queueModules = queueNames.map((name) =>
      BullModule.registerQueue({ name, ...DEFAULT_QUEUE_OPTIONS }),
    );

    return {
      module: QueueModule,
      imports: [BullModule.forRoot(DEFAULT_QUEUE_OPTIONS), ...queueModules],
      providers: [QueueService, QueueProcessor],
      exports: [QueueService],
    };
  }
}
