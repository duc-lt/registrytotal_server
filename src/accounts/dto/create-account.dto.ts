import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(6)
  username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(8)
  password: string;
}
