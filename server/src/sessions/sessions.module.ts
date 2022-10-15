import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SessionsService } from './services/sessions.service';
import { SessionsController } from './controllers/sessions.controller';

@Module({
    imports: [PrismaModule],
    providers: [SessionsService],
    exports: [SessionsService],
    controllers: [SessionsController],
})
export class SessionsModule {}
