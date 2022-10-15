import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../types';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async findOneById(id: number) {
        return await this.prisma.user.findUnique({ where: { id } });
    }

    async findOneByEmail(email: string) {
        return await this.prisma.user.findUnique({ where: { email } });
    }

    async create(user: CreateUserDto) {
        return await this.prisma.user.create({ data: user });
    }

    async confirm(id: number) {
        return await this.prisma.user.update({
            where: { id },
            data: { confirmed: true },
        });
    }
}
