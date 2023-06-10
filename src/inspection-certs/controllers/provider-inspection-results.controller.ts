import { HasRole } from '@accounts/decorators/role.decorator';
import { Account } from '@accounts/entities/account.entity';
import { Role } from '@accounts/enums/role.enum';
import { JwtAuthGuard } from '@accounts/guards/jwt-auth.guard';
import { RolesGuard } from '@accounts/guards/roles.guard';
import { CreateInspectionResultDto } from '@inspection-certs/dto/create-inspection-result.dto';
import { InspectionResultsService } from '@inspection-certs/services/inspection-results.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('[Trung tâm đăng kiểm][Inspection] Đăng kiểm')
@Controller('provider/inspection/results')
export class ProviderInspectionResultsController {
  constructor(
    private readonly inspectionResultsService: InspectionResultsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Tạo kết quả đăng kiểm',
    operationId: 'createResult',
  })
  @ApiBearerAuth()
  @ApiBody({ type: CreateInspectionResultDto })
  @UseGuards(JwtAuthGuard(Role.SERVICE_PROVIDER), RolesGuard)
  @HasRole(Role.SERVICE_PROVIDER)
  async createResult(
    @Body() createInspectionResultDto: CreateInspectionResultDto,
    @Req() req: Request<Account>,
  ) {
    return this.inspectionResultsService.create(
      createInspectionResultDto,
      (req.user as Account).provider.id,
    );
  }
}
