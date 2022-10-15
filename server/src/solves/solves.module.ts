import { Module } from '@nestjs/common';
import { SolvesController } from './controllers/solves.controller';
import { SolvesService } from './services/solves.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [SolvesController],
    providers: [SolvesService],
})
export class SolvesModule {}
