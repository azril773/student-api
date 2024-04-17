import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { TaskPgService } from './task-pg.service';
import { CreateTaskPgDto } from './dto/create-task-pg.dto';
import { UpdateTaskPgDto } from './dto/update-task-pg.dto';
import { Db, ObjectId } from 'mongodb';

@Controller('task-pg')
export class TaskPgController {
  constructor(private readonly taskPgService: TaskPgService) {}

  @Get()
  async findAll() {
    return await this.taskPgService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.taskPgService.findOne(new ObjectId(id));
  }
}
