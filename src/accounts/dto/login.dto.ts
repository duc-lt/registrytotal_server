import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ required: true, example: 'cucdangkiem' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ required: true, example: '123456' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
