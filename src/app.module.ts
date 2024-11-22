import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { appConfig, databaseConfig, queueConfig } from './config';
import { PolicyModule, InvoiceModule } from './modules';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, queueConfig],
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    QueueModule,
    InvoiceModule,
    PolicyModule,
  ],
})
export class AppModule {}
