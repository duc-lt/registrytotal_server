import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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

  // @ApiProperty({ required: true })
  // @IsNotEmpty()
  // @IsString()
  // streetAddress: string;

  // @ApiProperty({ required: true })
  // @Type(() => Number)
  // provinceCode: number;

  // @ApiProperty({ required: true })
  // @Type(() => Number)
  // districtCode: number;

  // @ApiProperty({ required: true })
  // @Type(() => Number)
  // communeCode: number;
}
