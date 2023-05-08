import { Module } from '@nestjs/common';
import { AccountsService } from './services/accounts.service';
import { AccountsController } from './controllers/accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { JwtModule } from '@nestjs/jwt';
import { LocalAuthStrategy } from './strategies/local-auth.strategy';
import { AccountRepository } from './repositories/account.repository';
import { AccountAuthService } from './services/account-auth.service';
import { ConfigModule } from '@nestjs/config';
import { Role } from './enums/role.enum';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AccountsController],
  providers: [
    ...Object.values(Role).map((role) => JwtAuthStrategy(role)),
    LocalAuthStrategy,
    AccountRepository,
    AccountsService,
    AccountAuthService,
  ],
})
export class AccountsModule {}
