import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
    imports: [UsersModule, SessionsModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
