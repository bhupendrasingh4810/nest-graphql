import {
    SetMetadata,
} from '@nestjs/common';


/**
 * Metadata key.
 */
export const ROLES_KEY = 'roles';



/**
 * Define required roles.
 *
 * Example:
 *
 * @Roles('ADMIN')
 */
export const Roles =
    (...roles: string[]) =>
        SetMetadata(
            ROLES_KEY,
            roles,
        );