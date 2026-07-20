import {
    Field,
    InputType,
} from '@nestjs/graphql';

import {
    IsString,
    Length,
} from 'class-validator';

/**
 * Change password DTO.
 */
@InputType()
export class ChangePasswordDto {

    /**
     * Current password.
     */
    @Field()
    @IsString()
    currentPassword!: string;

    /**
     * New password.
     */
    @Field()
    @IsString()
    @Length(8, 30)
    newPassword!: string;

}