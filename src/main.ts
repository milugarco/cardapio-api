import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Cardapio API DEV')
    .setDescription(
      'Utilize essa documentação para realizar integração com o nosso sistema',
    )
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `Token JWT`,
        bearerFormat: 'JWT', // I`ve tested not to use this field, but the result was the same
        scheme: 'bearer',
        type: 'http',
      }, // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .setVersion('2.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8000);
}
bootstrap();
