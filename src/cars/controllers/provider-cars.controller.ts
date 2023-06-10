import { HasRole } from '@accounts/decorators/role.decorator';
import { Account } from '@accounts/entities/account.entity';
import { Role } from '@accounts/enums/role.enum';
import { JwtAuthGuard } from '@accounts/guards/jwt-auth.guard';
import { RolesGuard } from '@accounts/guards/roles.guard';
import { ProviderCarFilterQueryDto } from '@cars/dto/provider-car-filter-query.dto';
import { CarsService } from '@cars/services/cars.service';
import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('[Trung tâm đăng kiểm][Car] Ô tô')
@Controller('provider/cars')
export class ProviderCarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get('search')
  @ApiOperation({
    summary: 'Tìm thông tin ô tô theo biển số',
    operationId: 'searchByRegistrationNumber',
  })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'registration_num',
    description: 'Biển số xe',
    required: true,
  })
  @UseGuards(JwtAuthGuard(Role.SERVICE_PROVIDER), RolesGuard)
  @HasRole(Role.SERVICE_PROVIDER)
  async searchByRegistrationNumber(
    @Query('registration_num') registrationNumber: string,
  ) {
    return this.carsService.searchByRegistrationNumber(registrationNumber);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lấy danh sách ô tô theo Trung tâm đăng kiểm',
    operationId: 'findAll',
  })
  @UseGuards(JwtAuthGuard(Role.SERVICE_PROVIDER), RolesGuard)
  @HasRole(Role.SERVICE_PROVIDER)
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(
    @Req() req: Request<Account>,
    @Query() filters: ProviderCarFilterQueryDto,
  ) {
    const { page, take, timeUnit, year, month, quarter } = filters;
    return this.carsService.findAllByProvider(
      (req.user as Account).provider.code,
      page,
      take,
      timeUnit,
      {
        year: { year },
        month: { year, month },
        quarter: { year, quarter },
      },
    );
  }
}
