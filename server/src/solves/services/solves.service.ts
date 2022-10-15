import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SolvesService {
    constructor(private prisma: PrismaService) {}

    async findAll(userId: number) {
        return await this.prisma.solve.findMany({ where: { userId } });
    }
}
