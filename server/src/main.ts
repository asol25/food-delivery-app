import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  const PORT = process.env.PORT || 33714;
  console.log('🚀 ~ file: main.ts:7 ~ bootstrap ~ PORT', PORT);
  const config = new DocumentBuilder()
    .setTitle('food-delivery-app')
    .setDescription('building food delivery app for beginners')
    .setVersion('1.0')
    .addTag('food-delivery-app')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
