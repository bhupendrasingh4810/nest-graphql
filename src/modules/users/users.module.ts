import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { UsersResolver } from './resolvers/users.resolvers';
import { UsersController } from './controllers/users.controller';

/**
 * Registers User entity with TypeORM.
 */
@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
        ]),
    ],
    controllers: [
        UsersController
    ],
    /**
   * Providers available
   * inside this module.
   */
    providers: [
        UsersService,
        UsersResolver,
    ],

    /**
     * Export service so
     * AuthModule can use it.
     */
    exports: [
        UsersService,
    ],
})
export class UsersModule { }
