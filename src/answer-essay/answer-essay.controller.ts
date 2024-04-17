import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, SetMetadata, UnauthorizedException, Headers, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { AnswerEssayService } from './answer-essay.service';
import { CreateAnswerEssayDto } from './dto/create-answer-essay.dto';
import { UpdateAnswerEssayDto } from './dto/update-answer-essay.dto';
import { AuthorizationGuard } from 'src/guards/authorization';
import { ResponseIntercept } from 'src/interceptors/response.intercept';
import { Reflector } from '@nestjs/core';
import { DecryptJwt } from 'src/functions/decrypt';
import { TasksService } from 'src/tasks/tasks.service';
import { DataSource } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { Answer } from './entities/answer-essay.entity';

@Controller('answer-essay')
@UseInterceptors(new ResponseIntercept(new Reflector()))
@UseGuards(AuthorizationGuard)
export class AnswerEssayController {
  constructor(private readonly answerEssayService: AnswerEssayService,private readonly taskService:TasksService,private readonly ds:DataSource) { }

  private async decrypt(jwt: string): Promise<any> {
    try {
      const result = await DecryptJwt(jwt)
      return result
    } catch (error) {
      throw new UnauthorizedException("something went wrong")
    }
  }

  @Post()
  @SetMetadata("aksjko2u3qwdhkq3r28wv98e", "success")
  async create(@Body() createAnswerEssayDto: CreateAnswerEssayDto,@Headers("authorization") authorization:string) {
    try {
      const {answer,taskIdId} = createAnswerEssayDto
      const jwts = await this.decrypt(authorization).catch(err => {
        throw new UnauthorizedException(err)
      })
      const user = await this.ds.query("SELECT id FROM users WHERE name=? AND deleted_at IS NULL",[jwts.name])
      if(user.length <= 0) throw new BadRequestException("user not found")
  
      
      const check = await this.ds.query("SELECT * FROM answers WHERE userIdId=? AND taskIdId=? AND deleted_at IS NULL",[+user[0].id,+taskIdId])
  
  
      if(check.length > 0) {
        await this.ds.getRepository(Answer).update({id:check[0].id},{answer,updated_at:new Date()})
        return await this.ds.getRepository(Answer).find({where:{id:check[0].id}})
      }else{
        createAnswerEssayDto["userIdId"] = user[0].id
        createAnswerEssayDto["score"] = 0
        createAnswerEssayDto["type"] = "essay"
    
        return await this.answerEssayService.create(createAnswerEssayDto);
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
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

    return await this.answerEssayService.findAll(+user[0].id);
  }

  @Get(':id')
  @SetMetadata("aksjko2u3qwdhkq3r28wv98e", "success")
  async findOne(@Param("id") id:string, @Headers("authorization") authorization:string) {
    const jwts = await this.decrypt(authorization).catch(err => {
      throw new UnauthorizedException(err)
    })
    const user = await this.ds.query("SELECT id FROM users WHERE name=? AND deleted_at IS NULL",[jwts.name])
    if(user.length <= 0) throw new BadRequestException("user not found")

    return await this.answerEssayService.findOne(+id,+user[0].id);
  }
}
