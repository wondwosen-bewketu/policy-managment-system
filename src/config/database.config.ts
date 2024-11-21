// database.config.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfigType } from './types';

@Injectable()
export class DatabaseConfigService {
  constructor(
    private readonly configService: ConfigService<DatabaseConfigType>,
  ) {}

  getDatabaseConfig() {
    return {
      type: this.configService.get<string>('type', { infer: true }),
      host: this.configService.get<string>('host', { infer: true }),
      port: this.configService.get<number>('port', { infer: true }),
      username: this.configService.get<string>('username', { infer: true }),
      password: this.configService.get<string>('password', { infer: true }),
      database: this.configService.get<string>('name', { infer: true }),
    };
  }
}
