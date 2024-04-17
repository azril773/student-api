import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DatabaseModule } from 'src/database.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  exports:[TasksService],
  imports:[DatabaseModule]
})
export class TasksModule {}
