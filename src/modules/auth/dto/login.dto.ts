import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * Request Body
 *
 * POST /api/auth/login
 */
export class LoginDto {
    /**
     * User email.
     */
    @IsEmail()
    email!: string;

    /**
     * User password.
     */
    @IsString()
    @IsNotEmpty()
    password!: string;
}