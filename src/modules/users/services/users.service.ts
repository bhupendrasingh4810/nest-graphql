import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { CreateUserInput } from '../dto/create-user.input';

import { User } from '../entities/user.entity';
import { UserRole } from '../enums/user-role.enum';

@Injectable()
export class UsersService {
    constructor(
        /**
         * Inject TypeORM repository.
         *
         * TypeORM creates this automatically
         * because of TypeOrmModule.forFeature().
         */
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    /**
     * Register a new user.
     */
    async create(
        input: CreateUserInput,
    ): Promise<User> {
        /**
         * Check if email already exists.
         */
        const existingUser =
            await this.userRepository.findOne({
                where: {
                    email: input.email,
                },
            });

        if (existingUser) {
            throw new ConflictException(
                'Email already exists.',
            );
        }

        /**
         * Hash password before saving.
         */
        const hashedPassword =
            await bcrypt.hash(
                input.password,
                10,
            );

        /**
         * Create entity instance.
         *
         * create() does NOT save.
         * It only creates an object.
         */
        const user =
            this.userRepository.create({
                fullName: input.fullName,

                email: input.email,

                password: hashedPassword,

                role:
                    input.role ??
                    UserRole.CUSTOMER,
            });

        /**
         * Save entity.
         *
         * save()
         *
         * INSERT
         * or
         * UPDATE
         */
        return this.userRepository.save(user);
    }

    /**
     * Find by email.
     */
    async findByEmail(
        email: string,
    ): Promise<User | null> {
        return this.userRepository.findOne({
            where: {
                email,
            },
        });
    }

    /**
     * Find by id.
     */
    async findById(
        id: number,
    ): Promise<User | null> {
        return this.userRepository.findOne({
            where: {
                id,
            },
        });
    }

    /**
     * Get all users.
     */
    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    /**
     * Update user.
     */
    async update(
        id: number,
        data: Partial<User>,
    ): Promise<User | null> {

        await this.userRepository.update(
            id,
            data,
        );
        return this.findById(id);
    }

    async updateProfile(

        id: number,

        data: Partial<User>,

    ): Promise<User> {



        const user =
            await this.findById(
                id,
            );



        if (!user) {

            throw new NotFoundException(
                'User not found',
            );

        }



        Object.assign(
            user,
            data,
        );



        return this.userRepository.save(
            user,
        );

    }
    /**
     * Delete user.
     */
    async delete(
        id: number,
    ): Promise<void> {
        await this.userRepository.delete(id);
    }

    /**
 * Find user using password reset token.
 */
    async findByResetToken(
        token: string,
    ): Promise<User | null> {
        return this.userRepository.findOne({
            where: {
                resetPasswordToken: token,
            },
        });
    }
}