import { Field, InputType } from '@nestjs/graphql';

import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

import { UserRole } from '../enums/user-role.enum';

/**
 * GraphQL Input Type
 *
 * Used by GraphQL mutations.
 *
 * Example:
 *
 * mutation {
 *   createUser(input:{...})
 * }
 */
@InputType()
export class CreateUserInput {
    /**
     * User's full name.
     */
    @Field()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    fullName!: string;

    /**
     * Email address.
     */
    @Field()
    @IsEmail()
    email!: string;

    /**
     * Plain text password.
     *
     * NOTE:
     * Service will hash it before saving.
     */
    @Field()
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    password!: string;

    /**
     * Optional role.
     *
     * Default = CUSTOMER
     */
    @Field(() => UserRole, {
        nullable: true,
    })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}