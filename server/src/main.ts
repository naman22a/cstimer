import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

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

    await app.listen(process.env.PORT);
}
bootstrap();
