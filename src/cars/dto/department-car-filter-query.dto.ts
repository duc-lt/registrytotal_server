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
import { ProviderCarFilterQueryDto } from './provider-car-filter-query.dto';

export class DepartmentCarFilterQueryDto extends ProviderCarFilterQueryDto {
  // @ApiProperty({ required: true, description: 'Số trang' })
  // @IsNotEmpty()
  // @Type(() => Number)
  // page: number;

  // @ApiProperty({
  //   required: true,
  //   description: 'Số bản ghi trong 1 trang',
  // })
  // @IsNotEmpty()
  // @Type(() => Number)
  // take: number;

  @ApiPropertyOptional({
    description: 'Tiêu chí lọc: theo Trung tâm (provider) hoặc khu vực (area)',
    enum: FilterLevel,
  })
  @ValidateIf((_, v) => typeof v !== 'undefined')
  @IsEnum(FilterLevel)
  level?: FilterLevel;

  @ApiPropertyOptional({
    description: 'Mã Trung tâm nếu lọc theo Trung tâm',
  })
  providerCode?: string;

  @ApiPropertyOptional({ description: 'Mã tỉnh/thành' })
  provinceCode?: number;

  @ApiPropertyOptional({ description: 'Mã quận/huyện' })
  @ValidateIf(
    (o, v) => o.level === FilterLevel.AREA && typeof v !== 'undefined',
  )
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  districtCode?: number;

  @ApiPropertyOptional({ description: 'Mã xã/phường' })
  @ValidateIf(
    (o, v) => o.level === FilterLevel.AREA && typeof v !== 'undefined',
  )
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  communeCode?: number;

  // @ApiPropertyOptional({
  //   name: 'time_unit',
  //   description: 'Tiêu chí lọc theo đơn vị thời gian: năm, tháng, quý',
  //   enum: FilterTimeUnit,
  // })
  // @ValidateIf((_, v) => typeof v !== 'undefined')
  // @IsEnum(FilterTimeUnit)
  // timeUnit?: FilterTimeUnit;

  // @ApiPropertyOptional()
  // @ValidateIf((o) => typeof o.timeUnit !== 'undefined')
  // @IsPositive()
  // @IsInt()
  // @Type(() => Number)
  // year?: number;

  // @ApiPropertyOptional()
  // @ValidateIf((o) => o.timeUnit === FilterTimeUnit.MONTH)
  // @IsInt()
  // @Min(1)
  // @Max(12)
  // @Type(() => Number)
  // month?: number;

  // @ApiPropertyOptional()
  // @ValidateIf((o) => o.timeUnit === FilterTimeUnit.QUARTER)
  // @IsInt()
  // @Min(1)
  // @Max(4)
  // @Type(() => Number)
  // quarter?: number;
}
