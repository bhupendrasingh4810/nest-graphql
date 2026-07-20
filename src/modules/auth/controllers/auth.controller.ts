import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';

import { AuthService } from '../services/auth.service';

import { LoginDto } from '../dto/login.dto';
import { SignUpInput } from '../dto/signup.input';

/**
 * REST Authentication Controller
 *
 * Base URL
 *
 * /api/auth
 */
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    /**
     * Register new user.
     *
     * POST
     * /api/auth/signup
     */
    @Post('signup')
    async signup(
        @Body() dto: SignUpInput,
    ) {
        return this.authService.signup(dto);
    }

    /**
     * Login user.
     *
     * POST
     * /api/auth/login
     */
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body() dto: LoginDto,
    ) {
        return this.authService.login(dto);
    }
}