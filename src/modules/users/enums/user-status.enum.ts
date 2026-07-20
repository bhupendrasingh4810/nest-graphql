import { registerEnumType } from '@nestjs/graphql';

/**
 * Current status of the user account.
 */
export enum UserStatus {
    ACTIVE = 'ACTIVE',

    INACTIVE = 'INACTIVE',

    BLOCKED = 'BLOCKED',
}

registerEnumType(UserStatus, {
    name: 'UserStatus',
});