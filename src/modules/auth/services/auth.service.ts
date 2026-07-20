import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../../users/services/users.service';

import { LoginDto } from '../dto/login.dto';
import { LoginInput } from '../dto/login.input';
import { SignUpInput } from '../dto/signup.input';

import { AuthResponse } from '../graphql/auth-response.type';

import { User } from '../../users/entities/user.entity';

/**
 * Authentication business logic.
 *
 * Handles:
 *
 * - Signup
 * - Login
 * - Password verification
 * - JWT generation
 *
 * Both REST and GraphQL
 * use this same service.
 */
@Injectable()
export class AuthService {
    constructor(
        /**
         * Users business layer.
         */
        private readonly usersService: UsersService,
        /**
         * JWT helper.
         */
        private readonly jwtService: JwtService,
    ) { }

    /**
     * Register new user.
     *
     * Flow:
     *
     * Request
     *    |
     * AuthService
     *    |
     * Hash Password
     *    |
     * UsersService
     *    |
     * Database
     */
    async signup(
        dto: SignUpInput,
    ): Promise<User> {

        /**
         * Hash password before storing.
         *
         * Never store plain passwords.
         */
        const hashedPassword =
            await bcrypt.hash(
                dto.password,
                10,
            );

        /**
         * Create user.
         */
        return this.usersService.create({
            fullName: dto.fullName,
            email: dto.email,
            password: hashedPassword,
        });
    }

    /**
     * Common authentication method.
     *
     * Both REST login and GraphQL login
     * call this method.
     */
    async authenticate(
        email: string,
        password: string,
    ): Promise<AuthResponse> {

        /**
         * Find user by email.
         */
        const user =
            await this.usersService.findByEmail(
                email,
            );

        /**
         * User does not exist.
         */
        if (!user) {
            throw new UnauthorizedException(
                'Invalid email or password.',
            );
        }

        /**
         * Compare entered password
         * with stored hash.
         */
        const isPasswordValid =
            await bcrypt.compare(
                password,
                user.password,
            );

        /**
         * Password mismatch.
         */
        if (!isPasswordValid) {
            throw new UnauthorizedException(
                'Invalid email or password.',
            );
        }

        /**
         * JWT payload.
         *
         * Never add:
         *
         * password
         */
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        /**
         * Generate access token.
         */
        const accessToken =
            await this.jwtService.signAsync(
                payload,
            );

        /**
         * Generate refresh token.
         *
         * Later:
         * - Store hash in database
         * - Add revoke support
         */
        const refreshToken =
            await this.jwtService.signAsync(
                payload,
                {
                    expiresIn: '30d',
                },
            );

        return {
            accessToken,
            refreshToken,
            user,
        };
    }

    /**
     * REST login.
     *
     * POST /auth/login
     */
    async login(
        dto: LoginDto,
    ): Promise<AuthResponse> {

        return this.authenticate(
            dto.email,
            dto.password,
        );
    }

    /**
     * GraphQL login.
     *
     * Mutation:
     *
     * login(input: LoginInput)
     */
    async graphqlLogin(
        input: LoginInput,
    ): Promise<AuthResponse> {

        return this.authenticate(
            input.email,
            input.password,
        );
    }
}