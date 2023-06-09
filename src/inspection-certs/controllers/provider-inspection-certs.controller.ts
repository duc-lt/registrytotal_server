import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { InspectionCertsService } from '../services/inspection-certs.service';
import { CreateInspectionCertDto } from '../dto/create-inspection-cert.dto';
import { UpdateInspectionCertDto } from '../dto/update-inspection-cert.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@accounts/guards/jwt-auth.guard';
import { Role } from '@accounts/enums/role.enum';
import { RolesGuard } from '@accounts/guards/roles.guard';
import { HasRole } from '@accounts/decorators/role.decorator';
import { Request } from 'express';
import { Account } from '@accounts/entities/account.entity';

@ApiTags('[Trung tâm đăng kiểm][Inspection] Đăng kiểm')
@Controller('provider/inspection/certs')
export class ProviderInspectionCertsController {
  constructor(
    private readonly inspectionCertsService: InspectionCertsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Tạo chứng nhận đăng kiểm',
    operationId: 'create',
  })
  @ApiBearerAuth()
  @ApiBody({ type: CreateInspectionCertDto })
  @UseGuards(JwtAuthGuard(Role.SERVICE_PROVIDER), RolesGuard)
  @HasRole(Role.SERVICE_PROVIDER)
  async create(
    @Body() createInspectionCertDto: CreateInspectionCertDto,
    @Req() req: Request<Account>,
  ) {
    return this.inspectionCertsService.create(
      createInspectionCertDto,
      (req.user as Account).provider.id,
    );
  }
}
