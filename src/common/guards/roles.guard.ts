import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * Checks user permissions.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    /**
     * Reads metadata.
     */
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    /**
     * Read required roles
     * from controller.
     */
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    /**
     * No role restriction.
     */
    if (!requiredRoles) {
      return true;
    }
    /**
     * Get request.
     */
    const request = context.switchToHttp().getRequest();
    /**
     * User from JWT strategy.
     */
    const user = request.user;
    /**
     * Check role.
     */
    return requiredRoles.includes(user.role);
  }
}
