import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';
import { SolvesModule } from './solves/solves.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
    imports: [
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 20,
        }),
        UsersModule,
        AuthModule,
        SessionsModule,
        SolvesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
