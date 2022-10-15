import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SessionsService {
    constructor(private prisma: PrismaService) {}

    async findAll(userId: number) {
        return await this.prisma.session.findMany({ where: { userId } });
    }

    async findAnyOne(userId: number) {
        return await this.prisma.session.findFirst({ where: { userId } });
    }

    async create(userId: number, name: string) {
        return await this.prisma.session.create({ data: { name, userId } });
    }
}
