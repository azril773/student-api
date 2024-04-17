import { Module } from '@nestjs/common';
import { TaskPgService } from './task-pg.service';
import { TaskPgController } from './task-pg.controller';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/database.module';

@Module({
  controllers: [TaskPgController],
  providers: [TaskPgService],
  imports:[DatabaseModule]
})
export class TaskPgModule {}
