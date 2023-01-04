import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import * as cookieParser from 'cookie-parser';
import { COOKIE_NAME, __prod__ } from './constants';
import { redis } from './redis';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

declare module 'express-session' {
    interface SessionData {
        userId: number;
        sessionId: number;
    }
}

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const RedisStore = connectRedis(session);

    app.set('trust proxy', 1);

    // validation
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors: ValidationError[] = []) => {
                const newErrors = errors.map((error) => {
                    const validationErrors = [];
                    for (let err in error.constraints) {
                        validationErrors.push(error.constraints[err]);
                    }
                    return {
                        field: error.property,
                        message: validationErrors[0],
                    };
                });
                return new BadRequestException({
                    ok: false,
                    errors: newErrors,
                });
            },
        }),
    );

    // MIDDLWARE
    app.enableCors({
        origin: process.env.WEBSITE_DOMAIN,
        credentials: true,
    });
    app.use(cookieParser());
    app.use(
        session({
            name: COOKIE_NAME,
            secret: process.env.SESSION_SECRET,
            resave: false,
            cookie: {
                sameSite: 'lax',
                httpOnly: true,
                secure: __prod__,
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
                domain: __prod__ ? process.env.COOKIE_DOMAIN : undefined,
            },
            store: new RedisStore({ client: redis }),
            saveUninitialized: false,
            proxy: __prod__,
        }),
    );

    // Swagger
    const config = new DocumentBuilder()
        .setTitle('CsTimer API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT);
}
bootstrap();
