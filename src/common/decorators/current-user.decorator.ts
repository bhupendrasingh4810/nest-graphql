import {
    createParamDecorator,
    ExecutionContext,
} from '@nestjs/common';

/**
 * Custom decorator.
 *
 * Instead of
 *
 * @Req() req
 * req.user
 *
 * we'll simply write
 *
 * @CurrentUser()
 */
export const CurrentUser =
    createParamDecorator(
        (
            data: unknown,
            context: ExecutionContext,
        ) => {
            /**
             * Get Express request.
             */
            const request =
                context.switchToHttp().getRequest();

            /**
             * Return authenticated user.
             */
            return request.user;
        },
    );