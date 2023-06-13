import { FilterLevel, FilterTimeUnit } from '../enums/filters.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

export class ProviderCarFilterQueryDto {
  @ApiProperty({ required: true, description: 'Số trang' })
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @ApiProperty({
    required: true,
    description: 'Số bản ghi trong 1 trang',
  })
  @IsNotEmpty()
  @Type(() => Number)
  take: number;

  @ApiPropertyOptional({
    description:
      'Tiêu chí lọc theo đơn vị thời gian: năm (year), quý (quarter), tháng (month)',
    enum: FilterTimeUnit,
  })
  @ValidateIf((_, v) => typeof v !== 'undefined')
  @IsEnum(FilterTimeUnit)
  timeUnit?: FilterTimeUnit;

  @ApiPropertyOptional()
  @ValidateIf((o) => typeof o.timeUnit !== 'undefined')
  @Type(() => Number)
  year?: number;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.timeUnit === FilterTimeUnit.MONTH)
  @Min(1)
  @Max(12)
  @Type(() => Number)
  month?: number;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.timeUnit === FilterTimeUnit.QUARTER)
  @Min(1)
  @Max(4)
  @Type(() => Number)
  quarter?: number;

  @ApiPropertyOptional()
  @Type(() => String)
  registration_num?: string;
}
