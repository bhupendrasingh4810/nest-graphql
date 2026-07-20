import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';

import { AuthService } from '../services/auth.service';

import { LoginDto } from '../dto/login.dto';
import { SignUpInput } from '../dto/signup.input';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

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

    /**
 * Change password.
 *
 * POST /auth/change-password
 *
 * Requires login.
 */
    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(
        @Request()
        req,
        @Body()
        dto: ChangePasswordDto,
    ): Promise<boolean> {
        return this.authService.changePassword(
            req.user.id,
            dto,
        );
    }

    /**
     * Forgot password.
     *
     * POST /auth/forgot-password
     */
    @Post('forgot-password')
    async forgotPassword(
        @Body()
        dto: ForgotPasswordDto,
    ): Promise<boolean> {
        return this.authService.forgotPassword(
            dto,
        );
    }

    /**
     * Reset password.
     *
     * POST /auth/reset-password
     */
    @Post('reset-password')
    async resetPassword(
        @Body()
        dto: ResetPasswordDto,
    ): Promise<boolean> {
        return this.authService.resetPassword(
            dto,
        );
    }
}