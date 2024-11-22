import { registerAs } from '@nestjs/config';
import { QueueConfig } from './types';

export default registerAs<QueueConfig>('queue', () => {
  return {
    url: process.env.REDIS_URL,
    db: process.env.REDIS_DB ? parseInt(process.env.REDIS_DB) : 0,
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  };
});
