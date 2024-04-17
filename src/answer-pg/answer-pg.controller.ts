import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, Headers, BadRequestException, Inject, SetMetadata } from '@nestjs/common';
import { AnswerPgService } from './answer-pg.service';
import { CreateAnswerPgDto } from './dto/create-answer-pg.dto';
import { UpdateAnswerPgDto } from './dto/update-answer-pg.dto';
import { DataSource } from 'typeorm';
import { DecryptJwt } from 'src/functions/decrypt';
import { Db, ObjectId } from 'mongodb';
import { AnswerPg } from './entities/answer-pg.entity';

@Controller('answer-pg')
export class AnswerPgController {
  constructor(private readonly answerPgService: AnswerPgService,private readonly ds:DataSource,@Inject("DATABASE") private readonly db:Db) {}

  private async decrypt(jwt: string): Promise<any> {
    try {
      const result = await DecryptJwt(jwt)
      return result
    } catch (error) {
      throw new UnauthorizedException("something went wrong")
    }
  }

  @Post()
  async create(@Body() createAnswerPgDto: CreateAnswerPgDto,@Headers("authorization") authorization:string) {
    const {answer,taskIdId} = createAnswerPgDto
    const jwts = await this.decrypt(authorization).catch(err => {
      throw new UnauthorizedException(err)
    })
    const user = await this.ds.query("SELECT id FROM users WHERE name=? AND deleted_at IS NULL",[jwts.name])
    if(user.length <= 0) throw new BadRequestException("user not found")

    const task = await this.db.collection("pg").find({$and:[{_id:new ObjectId(taskIdId)},{deleted_at:null}]}).toArray()
    if(task.length <= 0) throw new BadRequestException("task not found")
    
    const check = await this.ds.query("SELECT * FROM answers_pg WHERE userIdId=? AND taskIdId=? AND deleted_at IS NULL",[+user[0].id,taskIdId])

    // if()


    if(check.length > 0) {
      await this.ds.getRepository(AnswerPg).update({id:check[0].id},{answer})
      return await this.ds.getRepository(AnswerPg).find({where:{id:check[0].id}})
    }else{
      createAnswerPgDto["userIdId"] = user[0].id
      createAnswerPgDto["score"] = 0
  
      return await this.answerPgService.create(createAnswerPgDto);
    }
  }

  @Get()
  @SetMetadata("aksjko2u3qwdhkq3r28wv98e", "success")
  async findAll(@Headers("authorization") authorization:string) {
    const jwts = await this.decrypt(authorization).catch(err => {
      throw new UnauthorizedException(err)
    })
    const user = await this.ds.query("SELECT id FROM users WHERE name=? AND deleted_at IS NULL",[jwts.name])
    if(user.length <= 0) throw new BadRequestException("user not found")

    const answer = await this.ds.getRepository(AnswerPg).find()
    for (let i = 0; i < answer.length; i++) {
      const task = await this.db.collection("pg").findOne({_id:new ObjectId(answer[i].taskIdId)})
      answer[i]['task'] = task     
    }
    return answer
  }

  @Get(':id')
  @SetMetadata("aksjko2u3qwdhkq3r28wv98e", "success")
  async findOne(@Param("id") id:string,@Headers("authorization") authorization:string) {
    const jwts = await this.decrypt(authorization).catch(err => {
      throw new UnauthorizedException(err)
    })
    const user = await this.ds.query("SELECT id FROM users WHERE name=? AND deleted_at IS NULL",[jwts.name])
    if(user.length <= 0) throw new BadRequestException("user not found")

    const answer = await this.ds.getRepository(AnswerPg).find({where:{id:+id}})
    for (let i = 0; i < answer.length; i++) {
      const task = await this.db.collection("pg").findOne({$and:[{_id:new ObjectId(answer[i].taskIdId)},{deleted_at:null}]})
      if(!task) throw new BadRequestException("answer not found")
      answer[i]['task'] = task     
    }
    return answer
  }
}
