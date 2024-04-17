import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongoClient } from 'mongodb';
import { LoginModule } from './login/login.module';
import { TaskPgModule } from './task-pg/task-pg.module';
import { DatabaseModule } from './database.module';
import { AnswerEssayModule } from './answer-essay/answer-essay.module';
import { AnswerPgModule } from './answer-pg/answer-pg.module';
import { Answer } from './answer-essay/entities/answer-essay.entity';
import { AnswerPg } from './answer-pg/entities/answer-pg.entity';
import { Task } from './tasks/entities/task.entity';
import { TaskPg } from './task-pg/entities/task-pg.entity';

@Module({
  imports: [TasksModule,TypeOrmModule.forRoot({
    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'super_admin',
      entities: [Answer,AnswerPg],
      synchronize: true,
  }), LoginModule, TaskPgModule,DatabaseModule, AnswerEssayModule, AnswerPgModule],
  controllers: [],
})
export class AppModule {}
