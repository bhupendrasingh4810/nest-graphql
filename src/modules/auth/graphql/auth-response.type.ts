import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../users/entities/user.entity';

/**
 * Authentication response.
 *
 * Returned after successful login.
 */
@ObjectType()
export class AuthResponse {
  /**
   * JWT access token.
   */
  @Field()
  accessToken!: string;

  /**
   * JWT refresh token.
   */
  @Field()
  refreshToken!: string;

  /**
   * Logged in user.
   */
  @Field(() => User)
  user!: User;
}
