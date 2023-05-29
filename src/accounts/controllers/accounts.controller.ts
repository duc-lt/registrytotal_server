import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AccountsService } from '../services/accounts.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { Role } from '@accounts/enums/role.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@accounts/decorators/user.decorator';
import { Account } from '@accounts/entities/account.entity';
import { LocalAuthGuard } from '@accounts/guards/local-auth.guard';
import { AccountAuthService } from '@accounts/services/account-auth.service';
import { RolesGuard } from '@accounts/guards/roles.guard';
import { HasRole } from '@accounts/decorators/role.decorator';
import { LoginDto } from '@accounts/dto/login.dto';
import { JwtAuthGuard } from '@accounts/guards/jwt-auth.guard';

@ApiTags('[Account] Tài khoản')
@Controller('accounts')
@UseInterceptors(ClassSerializerInterceptor)
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly accountAuthService: AccountAuthService,
  ) {}

  @Post()
  @ApiOperation({
    description: 'Tạo tài khoản cho Trung tâm Đăng kiểm',
    operationId: 'create',
  })
  @ApiBody({ type: CreateAccountDto })
  @UseGuards(JwtAuthGuard(Role.DEPARTMENT), RolesGuard)
  @HasRole(Role.DEPARTMENT)
  @ApiBearerAuth()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Post('login')
  @ApiOperation({
    description: 'Đăng nhập',
    operationId: 'login',
  })
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  async login(@User() user: Account) {
    return this.accountAuthService.login(user);
  }

  @Get()
  @ApiOperation({
    description: 'Lấy danh sách tài khoản Trung tâm Đăng kiểm',
    operationId: 'findAll',
  })
  @UseGuards(JwtAuthGuard(Role.DEPARTMENT), RolesGuard)
  @HasRole(Role.DEPARTMENT)
  @ApiBearerAuth()
  async findAll() {
    return this.accountsService.findAllProviders();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Lấy thông tin tài khoản Trung tâm đăng kiểm',
    operationId: 'findById',
  })
  @UseGuards(JwtAuthGuard(Role.DEPARTMENT), RolesGuard)
  @HasRole(Role.DEPARTMENT)
  @ApiBearerAuth()
  async findById(@Param('id') id: string) {
    return this.accountsService.findProviderById(id);
  }
}
