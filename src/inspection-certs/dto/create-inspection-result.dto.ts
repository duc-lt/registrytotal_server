import { Criteria } from '@inspection-certs/enums/criteria.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInstance,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateInspectionResultDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  carId: string;

  @ApiProperty({
    required: true,
    example: Object.keys(Criteria).reduce((previous, key) => {
      previous[key.toLowerCase()] = false;
      return previous;
    }, {}),
  })
  @ValidateNested()
  @IsInstance(Map)
  @IsBoolean({ each: true })
  result: Map<Criteria, boolean>;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  inspectorName: string;
}
