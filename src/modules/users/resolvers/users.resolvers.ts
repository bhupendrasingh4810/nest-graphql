import {
    Args,
    Mutation,
    Query,
    Resolver,
} from '@nestjs/graphql';

import { CreateUserInput } from '../dto/create-user.input';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

/**
 * GraphQL Resolver.
 *
 * Responsible only for
 * GraphQL endpoints.
 */
@Resolver(() => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,
    ) { }

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
}