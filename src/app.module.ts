import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { AgriculturalModule } from './api/endpoints/agricultural.module';
import { LoggerMiddleware } from './api/middlewares/logger.middleware';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().default(5000),
        API_PREFIX: Joi.string().required(),
        APP_NAME: Joi.string().required(),
        CLIENT_DEV: Joi.string().required(),
        CLIENT_PROD: Joi.string().required(),
        SWAGGER_PREFIX: Joi.string().required(),
        SWAGGER_TITLE: Joi.string().required(),
        SWAGGER_VERSION: Joi.string().required(),
        SWAGGER_ENDPOINT: Joi.string().required(),
        SWAGGER_DESCRIPTION: Joi.string().required(),
      }),
      envFilePath: '.env',
    }),
    AgriculturalModule,
    PrismaModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'health', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}
