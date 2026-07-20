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
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { ParkingModule } from './modules/parking/parking.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';

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
    AuthModule,
    ParkingModule,
    VehiclesModule,
    TicketsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule { }
