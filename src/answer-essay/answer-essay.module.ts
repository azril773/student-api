import { Module } from '@nestjs/common';
import { AnswerEssayService } from './answer-essay.service';
import { AnswerEssayController } from './answer-essay.controller';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  controllers: [AnswerEssayController],
  providers: [AnswerEssayService],
  imports:[TasksModule]
})
export class AnswerEssayModule {}
