import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLConfigService } from './config/graphql.config';
import { ApolloDriver } from '@nestjs/apollo';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({  // Make environment variables available throughout the application.
      isGlobal: true,        // Register globally so we don't need to import ConfigModule in every module.
      cache: true
    }),
    // Register PostgreSQL
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),

    // Register GraphQL
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useClass: GraphQLConfigService,
    }),
    HealthModule,
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
