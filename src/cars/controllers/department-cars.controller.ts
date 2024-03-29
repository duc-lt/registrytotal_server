import { HasRole } from '@accounts/decorators/role.decorator';
import { Role } from '@accounts/enums/role.enum';
import { JwtAuthGuard } from '@accounts/guards/jwt-auth.guard';
import { RolesGuard } from '@accounts/guards/roles.guard';
import { DepartmentCarFilterQueryDto } from '@cars/dto/department-car-filter-query.dto';
import { UploadCarsFromFileDto } from '@cars/dto/upload-cars-from-file.dto';
import { FilterLevel } from '@cars/enums/filters.enum';
import { CarsService } from '@cars/services/cars.service';
import { FilterData, FilterTime } from '@cars/types/filter.type';
import {
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
  PickType,
} from '@nestjs/swagger';
import { fileConfig } from '@xlsx/configs/file.config';

@ApiTags('[Cục đăng kiểm][Car] Ô tô')
@Controller('department/cars')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard(Role.DEPARTMENT), RolesGuard)
@HasRole(Role.DEPARTMENT)
export class DepartmentCarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post('upload')
  @ApiOperation({
    summary: 'Upload file để tạo CSDL phương tiện đã qua đăng ký',
    operationId: 'create',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadCarsFromFileDto })
  @UseInterceptors(FileInterceptor('file', fileConfig))
  async create(@UploadedFile() file: Express.Multer.File) {
    return this.carsService.create(file.path);
  }

  @Get('stats')
  @ApiOperation({
    summary: 'Lấy thống kê ô tô',
    operationId: 'getStats',
  })
  @ApiQuery({
    type: PickType(DepartmentCarFilterQueryDto, [
      'level',
      'providerCode',
      'provinceCode',
      'districtCode',
      'communeCode',
      'year',
      'month',
    ]),
  })
  // @UsePipes(new ParseIntPipe())
  @UsePipes(new ValidationPipe({ transform: true }))
  async getStats(
    @Query()
    filters: Pick<
      DepartmentCarFilterQueryDto,
      | 'level'
      | 'providerCode'
      | 'provinceCode'
      | 'districtCode'
      | 'communeCode'
      | 'year'
      | 'month'
    >,
  ) {
    const {
      level,
      providerCode,
      provinceCode,
      districtCode,
      communeCode,
      year,
      month,
    } = filters;
    return this.carsService.getCarStats({ year: +year, month: +month }, level, {
      provider: { providerCode },
      area: { provinceCode, districtCode, communeCode },
    });
  }

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách ô tô',
    operationId: 'findAll',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() filters: DepartmentCarFilterQueryDto) {
    const {
      page,
      take,
      level,
      providerCode,
      provinceCode,
      districtCode,
      communeCode,
      timeUnit,
      year,
      month,
      quarter,
    } = filters;

    return this.carsService.findAll(
      page,
      take,
      level,
      {
        provider: { providerCode },
        area: { provinceCode, districtCode, communeCode },
      },
      timeUnit,
      {
        year: { year },
        month: { year, month },
        quarter: { year, quarter },
      },
    );
  }
}
