import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';
import { SolvesModule } from './solves/solves.module';

@Module({
    imports: [UsersModule, AuthModule, SessionsModule, SolvesModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
