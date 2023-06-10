import { ProviderLoginDto, DepartmentLoginDto } from '@accounts/dto';
import { Account } from '@accounts/entities/account.entity';
import { Role } from '@accounts/enums/role.enum';
import { AccountRepository } from '@accounts/repositories/account.repository';
import { JwtPayload } from '@accounts/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePasswords } from 'src/utils';

@Injectable()
export class AccountAuthService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: AccountRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validate(loginDto: ProviderLoginDto | DepartmentLoginDto, role: Role) {
    const { username, password } = loginDto;
    const account = await this.accountRepository.findOne({
      where: { username, role },
    });

    if (!account) {
      return;
    }

    const isMatchPasswords = await comparePasswords(password, account.password);
    if (!isMatchPasswords) {
      return;
    }

    return account;
  }

  async login(user: Account) {
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('ACCESS_EXPIRES'),
      secret: this.configService.get('ACCESS_KEY'),
    });
    return {
      ...payload,
      accessToken,
    };
  }
}
