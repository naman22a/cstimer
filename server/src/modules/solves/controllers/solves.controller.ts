import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../../../auth/auth.guard';
import { OkResponse } from '../../../common/types';
import { SolvesService } from '../services/solves.service';
import { CreateSolveDto, UpdateSolveDto } from '../types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('solves')
@UseGuards(AuthGuard)
@Controller('solves')
export class SolvesController {
    constructor(private solvesService: SolvesService) {}

    @Get()
    async findAllSolves(@Req() req: Request) {
        const { userId, sessionId } = req.session;
        return await this.solvesService.findAll({ userId, sessionId });
    }

    @Post()
    @HttpCode(201)
    async createSolve(@Req() req: Request, @Body() body: CreateSolveDto) {
        const { userId, sessionId } = req.session;
        return await this.solvesService.create({ userId, sessionId, ...body });
    }

    @Delete(':id')
    async deleteSolve(
        @Req() req: Request,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<OkResponse> {
        const { userId, sessionId } = req.session;
        const x = await this.solvesService.delete({ id, userId, sessionId });
        if (x.count === 0) {
            return {
                ok: false,
                errors: [{ field: 'id', message: 'No solve found' }],
            };
        }
        return { ok: true };
    }

    @Patch('status/:id')
    async updateSolve(
        @Param('id', ParseIntPipe) id: number,
        @Body() { status }: UpdateSolveDto,
        @Req() req: Request,
    ): Promise<OkResponse> {
        const { userId, sessionId } = req.session;
        const x = await this.solvesService.updateStatus({
            sessionId,
            userId,
            status,
            id,
        });
        if (x.count === 0) {
            return {
                ok: false,
                errors: [{ field: 'id', message: 'No solve found' }],
            };
        }
        return { ok: true };
    }

    @Patch('reset')
    async resetSolves(@Req() req: Request): Promise<OkResponse> {
        const { userId, sessionId } = req.session;
        await this.solvesService.resetSolves({ sessionId, userId });
        return { ok: true };
    }
}
