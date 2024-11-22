export const DEFAULT_QUEUE_OPTIONS = {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
};

export enum QueueName {
  EMAIL = 'email',
  NOTIFICATIONS = 'notifications',
  TASKS = 'tasks',
}
