import { HasRole } from '@accounts/decorators/role.decorator';
import { User } from '@accounts/decorators/user.decorator';
import { CreateAccountDto, DepartmentLoginDto } from '@accounts/dto';
import { Account } from '@accounts/entities/account.entity';
import { Role } from '@accounts/enums/role.enum';
import { JwtAuthGuard } from '@accounts/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@accounts/guards/local-auth.guard';
import { RolesGuard } from '@accounts/guards/roles.guard';
import { AccountAuthService } from '@accounts/services/account-auth.service';
import { AccountsService } from '@accounts/services/accounts.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[Cục đăng kiểm][Account] Tài khoản')
@Controller('department/accounts')
export class DepartmentAccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly accountAuthService: AccountAuthService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Tạo tài khoản cho Trung tâm đăng kiểm',
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
    summary: 'Đăng nhập tài khoản Cục đăng kiểm',
    operationId: 'login',
  })
  @ApiBody({ type: DepartmentLoginDto })
  @UseGuards(LocalAuthGuard(Role.DEPARTMENT))
  async login(@User() user: Account) {
    return this.accountAuthService.login(user);
  }

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách tài khoản Trung tâm đăng kiểm',
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
    summary: 'Lấy thông tin tài khoản Trung tâm đăng kiểm',
    operationId: 'findById',
  })
  @UseGuards(JwtAuthGuard(Role.DEPARTMENT), RolesGuard)
  @HasRole(Role.DEPARTMENT)
  @ApiBearerAuth()
  async findById(@Param('id') id: string) {
    return this.accountsService.findProviderById(id);
  }
}
