import { Injectable } from '@nestjs/common';
import { CreateAnswerPgDto } from './dto/create-answer-pg.dto';
import { UpdateAnswerPgDto } from './dto/update-answer-pg.dto';
import { AnswerPg } from './entities/answer-pg.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AnswerPgService {
  constructor(private readonly ds:DataSource){}
  async create(createAnswerPgDto: CreateAnswerPgDto) {
    return await this.ds.getRepository(AnswerPg).save(createAnswerPgDto)
  }

  findAll() {
    return `This action returns all answerPg`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answerPg`;
  }

  update(id: number, updateAnswerPgDto: UpdateAnswerPgDto) {
    return `This action updates a #${id} answerPg`;
  }

  remove(id: number) {
    return `This action removes a #${id} answerPg`;
  }
}
