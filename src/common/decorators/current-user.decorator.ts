import {
    createParamDecorator,
    ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

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
            const ctx = GqlExecutionContext.create(context);

            return ctx.getContext().req.user;
        },
    );