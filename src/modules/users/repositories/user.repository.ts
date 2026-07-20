import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

/**
 * User repository.
 */
@Injectable()
export class UserRepository {

    constructor(

        @InjectRepository(User)
        private readonly repository: Repository<User>,

    ) { }

    /**
     * Find user by email.
     */
    async findByEmail(
        email: string,
    ): Promise<User | null> {

        return this.repository.findOne({

            where: {

                email,

            },

        });

    }

    /**
     * Save user.
     */
    async save(
        user: User,
    ): Promise<User> {

        return this.repository.save(user);

    }

    /**
     * Create entity.
     */
    create(
        data: Partial<User>,
    ): User {

        return this.repository.create(data);

    }

}