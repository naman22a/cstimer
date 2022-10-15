import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SessionsService } from './services/sessions.service';

@Module({
    imports: [PrismaModule],
    providers: [SessionsService],
    exports: [SessionsService],
})
export class SessionsModule {}
