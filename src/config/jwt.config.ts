import { registerAs } from '@nestjs/config';

// JWT configuration
export default registerAs('jwt', () => ({
    // Secret key used to sign JWT tokens
    secret: process.env.JWT_SECRET,
    // Token expiration time
    expiresIn: process.env.JWT_EXPIRES_IN,
}));