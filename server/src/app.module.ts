import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
    imports: [UsersModule, AuthModule, SessionsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
