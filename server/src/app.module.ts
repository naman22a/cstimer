import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth';
import { UsersModule } from './shared';
import { SessionsModule, SolvesModule } from './modules';

@Module({
    imports: [
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 20,
        }),
        AuthModule,
        UsersModule,
        SessionsModule,
        SolvesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
