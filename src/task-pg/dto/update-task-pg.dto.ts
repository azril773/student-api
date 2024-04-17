import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskPgDto } from './create-task-pg.dto';

export class UpdateTaskPgDto extends PartialType(CreateTaskPgDto) {}
