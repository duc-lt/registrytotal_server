import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInspectionCertDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  carId: string;
}
