import {
    Args,
    Mutation,
    Resolver,
} from '@nestjs/graphql';

import { AuthService } from '../services/auth.service';
import { LoginInput } from '../dto/login.input';
import { AuthResponse } from '../graphql/auth-response.type';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
    ) { }

    /**
     * Login mutation.
     */
    @Mutation(() => AuthResponse)
    async login(
        @Args('input')
        input: LoginInput,
    ): Promise<AuthResponse> {
        return this.authService.graphqlLogin(input);
    }
}