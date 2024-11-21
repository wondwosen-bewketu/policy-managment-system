import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make it available across the app
      load: [appConfig],
      envFilePath: ['.env'], // Load environment variables
    }),
    DatabaseModule, // Import database module
  ],
})
export class AppModule {}
