import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerPgDto } from './create-answer-pg.dto';

export class UpdateAnswerPgDto extends PartialType(CreateAnswerPgDto) {}
