import { HasRole } from '@accounts/decorators/role.decorator';
import { Account } from '@accounts/entities/account.entity';
import { Role } from '@accounts/enums/role.enum';
import { JwtAuthGuard } from '@accounts/guards/jwt-auth.guard';
import { RolesGuard } from '@accounts/guards/roles.guard';
import { CarsService } from '@cars/services/cars.service';
import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
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
    name: 'certnum',
    description: 'Biển số xe',
    required: true,
  })
  @UseGuards(JwtAuthGuard(Role.SERVICE_PROVIDER), RolesGuard)
  @HasRole(Role.SERVICE_PROVIDER)
  async searchByRegistrationNumber(@Query('certnum') certNumber: string) {
    return this.carsService.searchByRegistrationNumber(certNumber);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lấy danh sách ô tô theo Trung tâm đăng kiểm',
    operationId: 'findAll',
  })
  @UseGuards(JwtAuthGuard(Role.SERVICE_PROVIDER), RolesGuard)
  @HasRole(Role.SERVICE_PROVIDER)
  async findAll(@Req() req: Request<Account>) {
    return this.carsService.findAllByProvider(
      (req.user as Account).provider.code,
    );
  }
}
