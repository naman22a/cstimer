import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
    CreateSolveOptions,
    DeleteSolveOptions,
    FindSolveOptions,
    UpdateSolveOptions,
} from '../types';

@Injectable()
export class SolvesService {
    constructor(private prisma: PrismaService) {}

    async findAll(where: FindSolveOptions) {
        return await this.prisma.solve.findMany({ where });
    }

    async create(data: CreateSolveOptions) {
        return await this.prisma.solve.create({ data });
    }

    async delete(where: DeleteSolveOptions) {
        return await this.prisma.solve.deleteMany({ where });
    }

    async updateStatus({ sessionId, userId, status }: UpdateSolveOptions) {
        return await this.prisma.solve.updateMany({
            where: { sessionId, userId },
            data: { status },
        });
    }

    async resetSolves(where: FindSolveOptions) {
        return await this.prisma.solve.deleteMany({ where });
    }
}
