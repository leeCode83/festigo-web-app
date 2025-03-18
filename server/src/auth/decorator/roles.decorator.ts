import { SetMetadata } from '@nestjs/common';

// Kunci metadata yang akan digunakan di RolesGuard
export const ROLES_KEY = 'roles';

// Decorator untuk menetapkan role pada endpoint
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
