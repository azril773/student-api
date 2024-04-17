import { Injectable } from '@nestjs/common';
import { CreateAnswerEssayDto } from './dto/create-answer-essay.dto';
import { UpdateAnswerEssayDto } from './dto/update-answer-essay.dto';
import { DataSource } from 'typeorm';
import { Answer } from './entities/answer-essay.entity';

@Injectable()
export class AnswerEssayService {
  constructor(private readonly ds:DataSource){}
  async create(createAnswerEssayDto: CreateAnswerEssayDto) {
    console.log(createAnswerEssayDto)
    return await this.ds.getRepository(Answer).save(createAnswerEssayDto)
  }

  async findAll(userIdId:number) {
    return await this.ds.getRepository(Answer).find({where:{userIdId}})
  }

  async findOne(id: number,userIdId:number) {
    return await this.ds.query('SELECT * FROM answers WHERE id=? AND userIdId=? AND deleted_at IS NULL',[+id,+userIdId])
  }

  update(id: number, updateAnswerEssayDto: UpdateAnswerEssayDto) {
    return `This action updates a #${id} answerEssay`;
  }
}
