import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Response returned after
 * successful authentication.
 */
@ObjectType()
export class AuthResponse {
    /**
     * JWT Access Token.
     */
    @Field()
    accessToken!: string;

    /**
     * JWT Refresh Token.
     */
    @Field()
    refreshToken!: string;
}