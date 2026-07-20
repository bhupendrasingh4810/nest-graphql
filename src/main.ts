import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefix all REST APIs with /api
  app.setGlobalPrefix('api');

  // Enable Cross-Origin Resource Sharing
  // Allows frontend applications (React, Next.js, Angular, etc.)
  // to communicate with this backend.
  app.enableCors({
    origin: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,                  // Automatically remove properties that are not defined in the DTO.
      transform: true,                  // Automatically convert incoming payloads to DTO instances.
      forbidNonWhitelisted: true,       // Throw an error if unknown properties are sent in the request body.
      transformOptions: {
        enableImplicitConversion: true  // Enable implicit type conversion. Example: "1" -> 1
      }
    })
  );

  // app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
