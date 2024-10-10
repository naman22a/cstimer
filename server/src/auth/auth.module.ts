import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { SessionsModule } from '../sessions/sessions.module';
import { PassportModule } from '@nestjs/passport';
import { GithubStrategy } from './github.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'github' }),
        UsersModule,
        SessionsModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, GithubStrategy],
})
export class AuthModule {}
