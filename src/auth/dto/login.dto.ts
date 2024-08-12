import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  
  @ApiProperty({ description: 'The email for the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password for the user' })
  @IsString()
  password: string;
}
