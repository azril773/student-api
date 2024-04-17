import { IsNotEmpty, IsString } from "class-validator"

export class CreateLoginDto {
    @IsNotEmpty()
    @IsString()
    username:string
    
    @IsNotEmpty()
    @IsString()
    password:string
}
