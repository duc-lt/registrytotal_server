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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '@accounts/decorators/user.decorator';
import { Account } from '@accounts/entities/account.entity';
import { LocalAuthGuard } from '@accounts/guards/local-auth.guard';
import { AccountAuthService } from '@accounts/services/account-auth.service';
import { RolesGuard } from '@accounts/guards/roles.guard';
import { HasRole } from '@accounts/decorators/role.decorator';
import { LoginDto } from '@accounts/dto/login.dto';
import { JwtAuthGuard } from '@accounts/guards/jwt-auth.guard';

@ApiTags('[Account]')
@Controller('accounts')
@UseInterceptors(ClassSerializerInterceptor)
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly accountAuthService: AccountAuthService,
  ) {}

  @Post()
  @ApiBody({ type: CreateAccountDto })
  @UseGuards(JwtAuthGuard(Role.DEPARTMENT), RolesGuard)
  @HasRole(Role.DEPARTMENT)
  @ApiBearerAuth()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  async login(@User() user: Account) {
    return this.accountAuthService.login(user);
  }

  @Get()
  async findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.accountsService.findById(id);
  }
}
