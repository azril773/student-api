import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(private readonly ds:DataSource){}
  async findAll(name:string,idKelas:number) {
    console.log(idKelas)
    return await this.ds.query("SELECT * FROM tasks WHERE studentClassIdId=? AND deleted_at IS NULL",[idKelas
    ])
  }

  async findOne(id: number,idKelas:number) {
    return await this.ds.query("SELECT * FROM tasks WHERE studentClassIdId=? AND deleted_at IS NULL AND id",[idKelas,id])
  }
}
