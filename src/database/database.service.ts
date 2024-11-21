// src/database/database.service.ts
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DatabaseConfigService } from '../config/database.config';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private readonly databaseConfigService: DatabaseConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const dbConfig = this.databaseConfigService.getDatabaseConfig();

    return {
      type: dbConfig.type as any, // Cast to avoid type mismatch
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      autoLoadEntities: true, // Automatically load entities from the application
      synchronize: process.env.NODE_ENV !== 'production', // Disable in production
      logging: process.env.NODE_ENV !== 'production', // Enable logging only in dev
    };
  }
}
