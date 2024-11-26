import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { appConfig, databaseConfig, queueConfig } from './config';
import { PolicyModule, InvoiceModule } from './modules';
import { QueueModule } from './queue/queue.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, queueConfig],
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    QueueModule,
    ScheduleModule.forRoot(),
    InvoiceModule,
    PolicyModule,
  ],
})
export class AppModule {}
