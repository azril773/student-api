import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskPgDto } from './dto/create-task-pg.dto';
import { UpdateTaskPgDto } from './dto/update-task-pg.dto';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class TaskPgService {
  constructor(@Inject("DATABASE") private readonly db:Db){}

  async findAll() {
    return await this.db.collection("pg").find({deleted_at:null}).toArray()
  }

  async findOne(id: ObjectId) {
    return await this.db.collection('pg').findOne({$and:[{_id:id},{deleted_at:null}]})
  }
}
