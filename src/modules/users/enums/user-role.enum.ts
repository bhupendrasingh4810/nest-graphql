import { registerEnumType } from '@nestjs/graphql';

/**
 * Roles supported by the application.
 *
 * ADMIN
 * Can manage the entire parking lot system.
 *
 * OPERATOR
 * Parking employee.
 *
 * CUSTOMER
 * End user.
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  CUSTOMER = 'CUSTOMER',
}

/**
 * Register enum with GraphQL.
 *
 * Without this GraphQL cannot expose enums.
 */
registerEnumType(UserRole, {
  name: 'UserRole',
});
