import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

/**
 * Request Body
 *
 * POST /api/auth/signup
 */
@InputType() // Registers class as a GraphQL Input Type
export class SignUpInput {
  /**
   * Full name of the user.
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
   * Plain password.
   *
   * Password will be hashed
   * before storing in database.
   */
  @Field()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password!: string;
}
