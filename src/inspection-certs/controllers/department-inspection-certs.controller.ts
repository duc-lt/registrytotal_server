import { HasRole } from '@accounts/decorators/role.decorator';
import { Role } from '@accounts/enums/role.enum';
import { JwtAuthGuard } from '@accounts/guards/jwt-auth.guard';
import { RolesGuard } from '@accounts/guards/roles.guard';
import { InspectionFilterQueryDto } from '@inspection-certs/dto/inspection-filter-query.dto';
import {
  FilterAreaUnit,
  FilterLevel,
} from '@inspection-certs/enums/filters.enum';
import { InspectionCertsService } from '@inspection-certs/services/inspection-certs.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CustomParseIntPipe } from 'src/utils';

@Controller('department/inspection')
@ApiTags('[Inspection][Department] API đăng kiểm cho Cục đăng kiểm')
export class DepartmentInspectionCertsController {
  constructor(
    private readonly inspectionCertsService: InspectionCertsService,
  ) {}

  @Get()
  @ApiBearerAuth()
  // @ApiQuery({ type: InspectionFilterQueryDto })
  @UseGuards(JwtAuthGuard(Role.DEPARTMENT), RolesGuard)
  @HasRole(Role.DEPARTMENT)
  async findAll() // @Query('level') level?: FilterLevel, // @Query('take', new CustomParseIntPipe()) take: number, // @Query('page', new CustomParseIntPipe()) page: number,
  // @Query('area') area?: FilterAreaUnit,
  // @Query('area_code', new CustomParseIntPipe()) areaCode?: number,
  // @Query('provider_code') providerCode?: string,
  // @Query('year', new CustomParseIntPipe()) year?: number,
  // @Query('quarter', new CustomParseIntPipe()) quarter?: number,
  // @Query('month', new CustomParseIntPipe()) month?: number,
  // @Query() query: InspectionFilterQueryDto,
  {
    // const {
    //   page,
    //   take,
    //   level,
    //   providerCode,
    //   provinceCode,
    //   districtCode,
    //   communeCode,
    //   timeUnit,
    //   year,
    //   month,
    //   quarter,
    // } = query;
    return this.inspectionCertsService.findAll();
  }
}
