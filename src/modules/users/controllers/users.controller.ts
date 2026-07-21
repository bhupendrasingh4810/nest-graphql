import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';

import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { UpdateProfileInput } from '../dto/update-profile.input';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   * Protected endpoint.
   *
   * Requires JWT.
   */
  @Get('me')
  async me(
    @CurrentUser()
    user: any,
  ) {
    return this.usersService.findById(user.id);
  }

  @Patch('profile')
  async updateProfile(
    @CurrentUser()
    user: any,

    @Body()
    input: UpdateProfileInput,
  ) {
    return this.usersService.updateProfile(
      user.id,

      input,
    );
  }
}
