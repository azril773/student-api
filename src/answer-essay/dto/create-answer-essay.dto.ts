import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAnswerEssayDto {
    @IsNotEmpty()
    @IsNumber()
    taskIdId:number

    @IsNotEmpty()
    @IsString()
    answer:string
}
