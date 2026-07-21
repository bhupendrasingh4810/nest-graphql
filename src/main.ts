import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefix all REST APIs with /api
  app.setGlobalPrefix('api');

  app.useGlobalFilters(new HttpExceptionFilter());

  // Enable Cross-Origin Resource Sharing
  // Allows frontend applications (React, Next.js, Angular, etc.)
  // to communicate with this backend.
  app.enableCors({
    origin: true,
  });

  app.use(helmet());
  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically remove properties that are not defined in the DTO.
      transform: true, // Automatically convert incoming payloads to DTO instances.
      forbidNonWhitelisted: true, // Throw an error if unknown properties are sent in the request body.
      transformOptions: {
        enableImplicitConversion: true, // Enable implicit type conversion. Example: "1" -> 1
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Parking Management API')
    .setDescription('NestJS + GraphQL + REST Parking Management System')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  // app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
