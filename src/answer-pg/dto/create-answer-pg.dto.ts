import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateAnswerPgDto {
    @IsNotEmpty()
    @IsString()
    taskIdId:string

    @IsNotEmpty()
    @IsEnum(["a","b","c","d","e"],{message:"status must be one of the following values: a,b,c,d, or e"})
    answer:string
}
