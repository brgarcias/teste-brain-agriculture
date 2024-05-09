import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import * as dotenv from 'dotenv';
import * as basicAuth from 'express-basic-auth';
import * as cookieParser from 'cookie-parser';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { TypeORMNotFoundExceptionFilter } from './filters/typeorm-not-found-filter';

const port: number = parseInt(process.env.SERVER_PORT);
const host: string = process.env.SERVER_HOST;

async function createNestApplication(): Promise<INestApplication> {
  return await NestFactory.create(AppModule, { cors: false });
}

function configureSwaggerBasicAuth(app: INestApplication): void {
  const swaggerUser: string = process.env.SWAGGER_USER;
  const swaggerPassword: string = process.env.SWAGGER_PASSWORD;

  const swaggerAuthOptions = {
    challenge: true,
    users: { [swaggerUser]: swaggerPassword },
  };

  app.use(['/docs', '/docs-json'], basicAuth(swaggerAuthOptions));
}

function configureSwaggerDocumentation(app: INestApplication): void {
  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      defaultModelsExpandDepth: -1,
    },
    customCssUrl: '../css/theme-flattop.css',
    customSiteTitle: 'Test Agro API V1.0',
  };

  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const swaggerDocumentBuilder = new DocumentBuilder()
    .setTitle('Test Agro API V1.0')
    .setDescription('Test Agro API Documentation')
    .addServer(host, process.env.APP_ENV)
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder,
    swaggerDocumentOptions,
  );
  SwaggerModule.setup('docs', app, swaggerDocument, swaggerOptions);
}

function configureGlobalSettings(app: INestApplication): void {
  app.enableShutdownHooks();
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
      validateCustomDecorators: true,
      always: true,
    }),
  );
  app.useGlobalFilters(new TypeORMNotFoundExceptionFilter());
  app.use(cookieParser());
}

async function startApplication(app: INestApplication): Promise<void> {
  await app.listen(port);
  console.log(`Application is running on: ${host}`);
}

async function bootstrap(): Promise<void> {
  dotenv.config();
  const app: INestApplication = await createNestApplication();
  configureSwaggerBasicAuth(app);
  configureSwaggerDocumentation(app);
  configureGlobalSettings(app);

  await startApplication(app);
}
bootstrap();
