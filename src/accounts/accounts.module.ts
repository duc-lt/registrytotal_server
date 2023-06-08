import { Module } from '@nestjs/common';
import { AccountsService } from './services/accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { JwtModule } from '@nestjs/jwt';
import { LocalAuthStrategy } from './strategies/local-auth.strategy';
import { AccountRepository } from './repositories/account.repository';
import { AccountAuthService } from './services/account-auth.service';
import { ConfigModule } from '@nestjs/config';
import { Role } from './enums/role.enum';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { ServiceProvider } from '@service-providers/entities/service-provider.entity';
import { DepartmentAccountsController } from './controllers/department-accounts.controller';
import { ProviderAccountsController } from './controllers/provider-accounts.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, ServiceProvider]),
    JwtModule,
    ConfigModule.forRoot(),
  ],
  controllers: [DepartmentAccountsController, ProviderAccountsController],
  providers: [
    ...Object.values(Role).map((role) => JwtAuthStrategy(role)),
    ...Object.values(Role).map((role) => LocalAuthStrategy(role)),
    AccountRepository,
    AccountsService,
    AccountAuthService,
  ],
})
export class AccountsModule {}
