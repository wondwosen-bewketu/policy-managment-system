import { AppConfigType } from './app-config.type';
import { DatabaseConfigType } from './database-config.type';
import { QueueConfig } from './queue-config.type';

export { AppConfigType, DatabaseConfigType, QueueConfig };
export type ConfigType = {
  app: AppConfigType;
  database: DatabaseConfigType;
  queue: QueueConfig;
};
