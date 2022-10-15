import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
    imports: [PrismaModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
