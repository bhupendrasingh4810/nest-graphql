import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

/**
 * Request Body
 *
 * POST /api/auth/signup
 */
export class SignUpDto {
    /**
     * Full name of the user.
     */
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    fullName!: string;

    /**
     * Email address.
     */
    @IsEmail()
    email!: string;

    /**
     * Plain password.
     *
     * Password will be hashed
     * before storing in database.
     */
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    password!: string;
}