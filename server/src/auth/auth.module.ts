import { Module } from '@nestjs/common';
import { UsersModule } from '../shared';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { SessionsModule } from '../modules';
import { PassportModule } from '@nestjs/passport';
import { GithubStrategy } from './github.strategy';
import { GoogleStrategy } from './google.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'github' }),
        UsersModule,
        SessionsModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, GithubStrategy, GoogleStrategy],
})
export class AuthModule {}
