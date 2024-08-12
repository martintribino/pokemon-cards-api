import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ description: 'The name of the user' })
    @IsString()
    @MinLength(4)
    name: string;
  
    @ApiProperty({ description: 'The email of the user' })
    @IsString()
    @IsEmail()
    email: string;
  
    @ApiProperty({ description: 'The email of the user' })
    @IsString()
    @MinLength(4)
    password: string;
}