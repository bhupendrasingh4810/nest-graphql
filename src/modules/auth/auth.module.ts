import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        /**
         * Import Users module
         * so AuthService can use it.
         */
        UsersModule,

        /**
         * Register JWT.
         */
        JwtModule.registerAsync({
            imports: [ConfigModule],

            inject: [ConfigService],

            useFactory: (configService: ConfigService) => ({
                /**
                 * Secret used to sign JWT tokens.
                 */
                secret: configService.getOrThrow<string>('JWT_SECRET'),

                /**
                 * Default signing options.
                 */
                signOptions: {
                    /**
                     * Convert "1d", "7d", etc. into milliseconds.
                     */
                    // Read from .env
                    expiresIn: configService.getOrThrow<string>('JWT_EXPIRES_IN') as any,
                },
            }),
        }),
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        AuthResolver,
        JwtStrategy
    ],

    exports: [
        AuthService,
    ],
})
export class AuthModule { }
