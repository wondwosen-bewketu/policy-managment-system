import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

export default new DataSource({
  type: process.env.DATABASE_TYPE as 'postgres', // or your database type
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  synchronize: false, // Set this to false in production
  logging: true,
  migrations: [__dirname + '/src/database/migrations/**/*{.ts,.js}'],
});
