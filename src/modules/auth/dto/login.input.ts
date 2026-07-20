import { Field, InputType } from '@nestjs/graphql';

import {
    IsEmail,
    IsNotEmpty,
    IsString,
} from 'class-validator';

/**
 * Login input received from GraphQL.
 */
@InputType()
export class LoginInput {
    /**
     * User email.
     */
    @Field()
    @IsEmail()
    email!: string;

    /**
     * Plain password.
     */
    @Field()
    @IsString()
    @IsNotEmpty()
    password!: string;
}