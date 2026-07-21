import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';

import { ConfigService } from '@nestjs/config';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../../users/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    /**
     * Used to fetch user details.
     */
    private readonly usersService: UsersService,

    /**
     * Read JWT secret from .env
     */
    private readonly configService: ConfigService,
  ) {
    super({
      /**
       * Read JWT from
       *
       * Authorization: Bearer <token>
       */
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      /**
       * Token should not be expired.
       */
      ignoreExpiration: false,

      /**
       * Secret used to verify JWT.
       */
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  /**
   * This method is called only
   * AFTER JWT signature has been verified.
   *
   * payload =
   * {
   *   sub,
   *   email,
   *   role
   * }
   */
  async validate(payload: { sub: number; email: string; role: string }) {
    /**
     * Fetch latest user from database.
     *
     * Never trust JWT completely.
     *
     * User may have been deleted
     * after token generation.
     */
    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    /**
     * Whatever is returned here
     * becomes
     *
     * request.user
     */
    return user;
  }
}
