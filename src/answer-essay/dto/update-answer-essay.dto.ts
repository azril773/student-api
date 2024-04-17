import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerEssayDto } from './create-answer-essay.dto';

export class UpdateAnswerEssayDto extends PartialType(CreateAnswerEssayDto) {}
