import {
    Args,
    Mutation,
    Resolver,
} from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { SignUpInput } from '../dto/signup.input';
import { LoginInput } from '../dto/login.input';
import { AuthResponse } from '../graphql/auth-response.type';
import { User } from '../../users/entities/user.entity';


/**
 * GraphQL Authentication Resolver.
 *
 * Handles:
 *
 * signup mutation
 * login mutation
 */
@Resolver()
export class AuthResolver {
    constructor(
        /**
         * Authentication business layer.
         */
        private readonly authService: AuthService,

    ) { }

    /**
     * Register user.
     *
     * GraphQL Mutation:
     *
     * mutation {
     *   signup(input:{...})
     * }
     */
    @Mutation(
        () => User,
        {
            name: 'signup',
        },
    )
    async signup(
        @Args(
            'input',
        )
        input: SignUpInput,
    ): Promise<User> {
        return this.authService.signup(
            input,
        );
    }

    /**
     * Login user.
     *
     * GraphQL Mutation:
     *
     * mutation {
     *   login(input:{...})
     * }
     */
    @Mutation(
        () => AuthResponse,
        {
            name: 'login',
        },
    )
    async login(
        @Args(
            'input',
        )
        input: LoginInput,
    ): Promise<AuthResponse> {
        return this.authService.graphqlLogin(
            input,
        );
    }
}