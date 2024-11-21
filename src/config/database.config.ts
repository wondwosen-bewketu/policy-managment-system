// database.config.ts
import { Injectable } from '@nestjs/common';
import { DatabaseConfigType } from './types';
import { registerAs } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  getDatabaseConfig(): DatabaseConfigType {
    return {
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    };
  }
}

export default registerAs<DatabaseConfigType>('database', () => {
  const configService = new DatabaseConfigService();
  return configService.getDatabaseConfig();
});
