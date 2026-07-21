import { registerAs } from '@nestjs/config';

// Register database configuration. Can later be accessed using ConfigService.
export default registerAs('database', () => ({
  // PostgreSQL host
  host: process.env.DATABASE_HOST,
  // PostgreSQL port
  port: Number(process.env.DATABASE_PORT),
  // PostgreSQL username
  username: process.env.DATABASE_USERNAME,
  // PostgreSQL password
  password: process.env.DATABASE_PASSWORD,
  // Database name
  database: process.env.DATABASE_NAME,
}));
