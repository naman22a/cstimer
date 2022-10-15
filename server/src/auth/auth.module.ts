import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
    imports: [UsersModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
