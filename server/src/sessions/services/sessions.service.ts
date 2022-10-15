import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
    FindOneByIdOptions,
    DeleteOneByIdOptions,
    RenameOneByIdOptions,
} from '../types';

@Injectable()
export class SessionsService {
    constructor(private prisma: PrismaService) {}

    async findAll(userId: number) {
        return await this.prisma.session.findMany({ where: { userId } });
    }

    async findAnyOne(userId: number) {
        return await this.prisma.session.findFirst({ where: { userId } });
    }

    async findOneById({ id, userId }: FindOneByIdOptions) {
        return await this.prisma.session.findFirst({ where: { id, userId } });
    }

    async create(userId: number, name: string) {
        return await this.prisma.session.create({ data: { name, userId } });
    }

    async delete({ id, userId }: DeleteOneByIdOptions) {
        return await this.prisma.session.deleteMany({ where: { id, userId } });
    }

    async rename({ id, name }: RenameOneByIdOptions) {
        return await this.prisma.session.update({
            where: { id },
            data: { name },
        });
    }
}
