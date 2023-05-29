import {
  FilterAreaUnit,
  FilterLevel,
  FilterTimeUnit,
} from '@inspection-certs/enums/filters.enum';
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

export class InspectionFilterQueryDto {
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
    description: 'Tiêu chí lọc: theo Trung tâm (provider) hoặc khu vực (area)',
  })
  @IsEnum(Object.values(FilterLevel))
  level?: FilterLevel;

  @ApiPropertyOptional({
    name: 'provider_code',
    description: 'Mã Trung tâm nếu lọc theo Trung tâm',
  })
  @ValidateIf((o) => o.level === FilterLevel.PROVIDER)
  @IsNotEmpty()
  @IsString()
  providerCode?: string;

  @ApiPropertyOptional({ name: 'province_code', description: 'Mã tỉnh/thành' })
  @ValidateIf((o) => o.level === FilterLevel.AREA)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  provinceCode?: number;

  @ApiPropertyOptional({ name: 'district_code', description: 'Mã quận/huyện' })
  @ValidateIf((o) => o.level === FilterLevel.AREA)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  districtCode?: number;

  @ApiPropertyOptional({ name: 'commune_code', description: 'Mã xã/phường' })
  @ValidateIf((o) => o.level === FilterLevel.AREA)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  communeCode?: number;

  @ApiPropertyOptional({ name: 'time_unit' })
  @IsEnum(Object.values(FilterTimeUnit))
  timeUnit?: FilterTimeUnit;

  @ApiPropertyOptional()
  @ValidateIf((o) => typeof o.timeUnit !== 'undefined')
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  year?: number;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.timeUnit === FilterTimeUnit.MONTH)
  @IsInt()
  @Min(1)
  @Max(12)
  @Type(() => Number)
  month?: number;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.timeUnit === FilterTimeUnit.QUARTER)
  @IsInt()
  @Min(1)
  @Max(12)
  @Type(() => Number)
  quarter?: number;
}
