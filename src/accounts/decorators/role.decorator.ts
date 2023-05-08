import { Role } from '@accounts/enums/role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'role';
export const HasRole = (role: Role) => SetMetadata(ROLE_KEY, role);
