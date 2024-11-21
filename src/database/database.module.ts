import { Module } from '@nestjs/common';
import { DatabaseConfigService } from '../config/database.config';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseConfigService, DatabaseService],
  exports: [DatabaseConfigService], // Export DatabaseConfigService if needed in other modules
})
export class DatabaseModule {}
