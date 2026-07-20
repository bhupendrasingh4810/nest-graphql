import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../../users/services/users.service';

import { LoginDto } from '../dto/login.dto';
import { LoginInput } from '../dto/login.input';
import { SignUpDto } from '../dto/signup.dto';

import { AuthResponse } from '../graphql/auth-response.type';
import { User } from '../../users/entities/user.entity';

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
     * Both REST and GraphQL
     * will call this method.
     */
    async signup(
        dto: SignUpDto,
    ): Promise<User> {
        return this.usersService.create({
            fullName: dto.fullName,
            email: dto.email,
            password: dto.password,
        });
    }

    /**
     * Main authentication method.
     *
     * ALL login requests
     * should eventually reach here.
     *
     * No duplicated logic.
     */
    async authenticate(
        email: string,
        password: string,
    ): Promise<AuthResponse> {
        /**
         * Find user.
         */
        const user =
            await this.usersService.findByEmail(email);

        /**
         * User not found.
         */
        if (!user) {
            throw new UnauthorizedException(
                'Invalid email or password.',
            );
        }

        /**
         * Verify password.
         */
        const isPasswordValid =
            await bcrypt.compare(
                password,
                user.password,
            );

        if (!isPasswordValid) {
            throw new UnauthorizedException(
                'Invalid email or password.',
            );
        }

        /**
         * JWT Payload.
         *
         * Never include password.
         */
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        /**
         * Create Access Token.
         */
        const accessToken =
            await this.jwtService.signAsync(payload);

        /**
         * Create Refresh Token.
         *
         * Later we'll store its hash
         * in the database.
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
        };
    }

    /**
     * REST Login.
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
     * GraphQL Login.
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