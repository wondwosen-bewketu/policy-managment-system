// src/database/database.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigType } from '../config/types';
@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<ConfigType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('database.type', { infer: true }),
      host: this.configService.get('database.host', { infer: true }),
      port: this.configService.get('database.port', { infer: true }),
      username: this.configService.get('database.username', { infer: true }),
      password: this.configService.get<string>('database.password', {
        infer: true,
      }),
      database: this.configService.get('database.database', { infer: true }),
      autoLoadEntities: true,
      synchronize: this.configService.get('app.nodeEnv', { infer: true }),
      logging: this.configService.get('app.appName', { infer: true }),
    } as TypeOrmModuleOptions;
  }
}
