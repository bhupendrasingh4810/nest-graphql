import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    // Used to read values from .env
    private readonly configService: ConfigService,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      // Database type
      type: 'postgres',

      // Read values directly from .env
      host: this.configService.get<string>('DATABASE_HOST'),

      port: Number(this.configService.get('DATABASE_PORT')),

      username: this.configService.get<string>('DATABASE_USERNAME'),

      password: this.configService.get<string>('DATABASE_PASSWORD'),

      database: this.configService.get<string>('DATABASE_NAME'),

      // Automatically only loads entities registered with TypeOrmModule.forFeature()
      autoLoadEntities: true,

      // Only for development
      synchronize: true,

      // Print SQL queries in the terminal
      logging: true,
    };
  }
}
