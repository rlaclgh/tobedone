import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/filters/all-exception-filter';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Tobedone')
    .setDescription('Tobedone APIs description')
    .setVersion('1.0')
    .addTag('Tobedone')
    .addBearerAuth(
      {
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        name: 'JWT',
        bearerFormat: 'JWT',
      },
      'authorization',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        throw new HttpException(
          {
            code: 'FAIL',
            message: Object.values(errors[0].constraints)[0],
            data: null,
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  app.enableCors({
    credentials: true,
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(5000);
}
bootstrap();
