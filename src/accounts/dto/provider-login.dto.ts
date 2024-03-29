import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProviderLoginDto {
  @ApiProperty({ required: true, example: 'e1359' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ required: true, example: '123456' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
