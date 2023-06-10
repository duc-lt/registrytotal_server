import { User } from '@accounts/decorators/user.decorator';
import { ProviderLoginDto } from '@accounts/dto';
import { Account } from '@accounts/entities/account.entity';
import { Role } from '@accounts/enums/role.enum';
import { LocalAuthGuard } from '@accounts/guards/local-auth.guard';
import { AccountAuthService } from '@accounts/services/account-auth.service';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[Trung tâm đăng kiểm][Account] Tài khoản')
@Controller('provider/accounts')
export class ProviderAccountsController {
  constructor(private readonly accountAuthService: AccountAuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Đăng nhập tài khoản Trung tâm đăng kiểm',
    operationId: 'login',
  })
  @ApiBody({ type: ProviderLoginDto })
  @UseGuards(LocalAuthGuard(Role.SERVICE_PROVIDER))
  async login(@User() user: Account) {
    return this.accountAuthService.login(user);
  }
}
