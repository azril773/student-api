import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, Headers, UseGuards, Req, SetMetadata, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DataSource } from 'typeorm';
import axios from "axios"
import { DecryptJwt } from 'src/functions/decrypt';
import { AuthorizationGuard } from 'src/guards/authorization';
import { Request } from 'express';
import { ResponseIntercept } from 'src/interceptors/response.intercept';
import { Reflector } from '@nestjs/core';
@Controller('tasks')
@UseInterceptors(new ResponseIntercept(new Reflector()))
@UseGuards(AuthorizationGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService, private readonly ds: DataSource) { }

  private async decrypt(jwt: string): Promise<any> {
    try {
      const result = await DecryptJwt(jwt)
      return result
    } catch (error) {
      throw new UnauthorizedException("something went wrong")
    }
  }

  @Get('/essay')
  @SetMetadata("aksjko2u3qwdhkq3r28wv98e","success get all task")
  async findAll(@Headers("authorization") authorization:string) {
    const jwts = await this.decrypt(authorization)
    const result = await this.tasksService.findAll(jwts.name,+jwts.idKelas);
    return result
  }
  
  @Get('/essay/:id')
  @SetMetadata("aksjko2u3qwdhkq3r28wv98e","success get a task")
  async findOne(@Param('id') id: string,@Headers("authorization") authorization:string) {
    const jwts = await this.decrypt(authorization)
    return this.tasksService.findOne(+id,+jwts.idKelas);
  }
}
