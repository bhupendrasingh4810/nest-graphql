import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from '../dto/create-user.input';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { UpdateProfileInput } from '../dto/update-profile.input';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

/**
 * GraphQL Resolver.
 *
 * Responsible only for
 * GraphQL endpoints.
 */
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GraphQL Query
   *
   * query {
   *   users {
   *     id
   *     fullName
   *   }
   * }
   */
  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   * GraphQL Mutation
   *
   * mutation {
   *   createUser(input:{...})
   * }
   */
  @Mutation(() => User)
  async createUser(
    @Args('input')
    input: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(input);
  }

  /**
   * Logged in user.
   */
  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(
    @CurrentUser()
    user: any,
  ) {
    return this.usersService.findById(user.id);
  }

  /**
   * Update profile.
   */
  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @CurrentUser()
    user: any,

    @Args('input')
    input: UpdateProfileInput,
  ) {
    return this.usersService.updateProfile(
      user.id,

      input,
    );
  }
}
