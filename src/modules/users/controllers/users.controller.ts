import {
    Controller,
    Get,
    UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';

import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
    /**
     * Protected endpoint.
     *
     * Requires JWT.
     */
    @Get('me')
    @UseGuards(JwtAuthGuard)
    profile(
        /**
         * Current authenticated user.
         */
        @CurrentUser()
        user: User,
    ) {
        return user;
    }
}