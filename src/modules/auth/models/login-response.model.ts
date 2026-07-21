import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../users/entities/user.entity';

/**
 * Login response.
 */
@ObjectType()
export class LoginResponse {
  /**
   * JWT Access Token.
   */
  @Field()
  accessToken!: string;

  /**
   * Logged in user.
   */
  @Field(() => User)
  user!: User;
}
