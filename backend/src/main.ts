import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);

  app.enableCors();

  // swagger documentation setsup
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('HRMS')
    .setDescription('APIs documentation for HRMS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // global validation setup
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  const PORT = +configService.get<number>('PORT');
  await app.listen(PORT);
}
bootstrap();
