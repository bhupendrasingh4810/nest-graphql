import { Injectable } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

/**
 * Protect REST APIs.
 *
 * Example:
 *
 * @UseGuards(JwtAuthGuard)
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
