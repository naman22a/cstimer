import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../../auth/auth.guard';
import { SolvesService } from '../services/solves.service';

@UseGuards(AuthGuard)
@Controller('solves')
export class SolvesController {
    constructor(private solvesService: SolvesService) {}
    @Get()
    async findAllSolves(@Req() req: Request) {
        const { userId } = req.session;
        return await this.solvesService.findAll(userId);
    }
}
