import { Module } from '@nestjs/common';
import { AnswerPgService } from './answer-pg.service';
import { AnswerPgController } from './answer-pg.controller';
import { DatabaseModule } from 'src/database.module';

@Module({
  controllers: [AnswerPgController],
  providers: [AnswerPgService],
  imports:[DatabaseModule]
})
export class AnswerPgModule {}
