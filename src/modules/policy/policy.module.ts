import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Policy } from '../../database/entities';
import { PolicyService } from './services';
import { PolicyController } from './controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([Policy]), // Register the Policy entity
  ],
  controllers: [PolicyController],
  providers: [PolicyService],
})
export class PolicyModule {}
