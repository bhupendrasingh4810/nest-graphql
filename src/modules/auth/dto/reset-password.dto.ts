import {
    Field,
    InputType,
} from '@nestjs/graphql';


import {
    IsString,
    Length,
} from 'class-validator';


@InputType()
export class ResetPasswordDto {
    /**
     * Token received by email.
     */
    @Field()
    @IsString()
    token!: string;

    /**
     * New password.
     */
    @Field()
    @IsString()
    @Length(8, 100)
    newPassword!: string;

}