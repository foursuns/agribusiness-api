import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const loggerInfo = new Logger('AgriBusiness Auth');

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: [configService.get('CLIENT_DEV'), configService.get('CLIENT_PROD')],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Origin',
      'Accept',
      'x-access-token',
      'X-Requested-With',
      'x-tenant-id',
      'XSRF-TOKEN',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableVersioning({ type: VersioningType.URI });

  app.use(helmet());
  app.setGlobalPrefix(configService.get('API_PREFIX'));
  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle(configService.get('SWAGGER_TITLE'))
    .setDescription(configService.get('SWAGGER_DESCRIPTION'))
    .setVersion(configService.get('SWAGGER_VERSION'))
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(configService.get('SWAGGER_ENDPOINT'), app, document);

  await app.listen(configService.get('PORT') ?? 5000);

  loggerInfo.log(`🚀 Application running on port ${configService.get('PORT') ?? 5000}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
    loggerInfo.log(`❌ Application stopping on port ${configService.get('PORT') ?? 5000}`);
  }
}

bootstrap();
