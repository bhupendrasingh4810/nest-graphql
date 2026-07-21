import { SetMetadata } from '@nestjs/common';

/**
 * Metadata key.
 *
 * Used by RolesGuard
 * to read required roles.
 */
export const ROLES_KEY = 'roles';

/**
 * Usage:
 *
 * @Roles(UserRole.ADMIN)
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
