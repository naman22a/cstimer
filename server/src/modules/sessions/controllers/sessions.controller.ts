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
import { SessionsService } from '../services/sessions.service';
import { CreateSessionDto, RenameSessionDto } from '../types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sessions')
@UseGuards(AuthGuard)
@Controller('sessions')
export class SessionsController {
    constructor(private sessionsService: SessionsService) {}
    @Get()
    async findAllSessions(@Req() req: Request) {
        const { userId } = req.session;
        return await this.sessionsService.findAll(userId);
    }

    @Get('current')
    async getCurrentSession(@Req() req: Request) {
        const { userId, sessionId: id } = req.session;
        return await this.sessionsService.findOneById({ id, userId });
    }

    @Post()
    @HttpCode(201)
    async createSession(
        @Req() req: Request,
        @Body() { name }: CreateSessionDto,
    ) {
        const { userId } = req.session;
        const newSession = await this.sessionsService.create(userId, name);
        req.session.sessionId = newSession.id;
        return newSession;
    }

    @Delete(':id')
    async deleteSession(
        @Req() req: Request,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<OkResponse> {
        const { userId } = req.session;
        const x = await this.sessionsService.delete({ id, userId });
        if (x.count === 0) {
            return {
                ok: false,
                errors: [{ field: 'id', message: 'No session found' }],
            };
        }

        if (req.session.sessionId === id) {
            const anySession = await this.sessionsService.findAnyOne(userId);
            req.session.sessionId = anySession.id;
        }

        return { ok: true };
    }

    @Patch('change/:id')
    async changeSession(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: Request,
    ): Promise<OkResponse> {
        const { userId } = req.session;

        const session = await this.sessionsService.findOneById({ id, userId });
        if (!session) {
            return {
                ok: false,
                errors: [{ field: 'id', message: 'No session found' }],
            };
        }

        req.session.sessionId = session.id;

        return { ok: true };
    }

    @Patch('rename')
    async renameSession(
        @Body() { name }: RenameSessionDto,
        @Req() req: Request,
    ): Promise<OkResponse> {
        const id = req.session.sessionId;
        await this.sessionsService.rename({ id, name });

        return { ok: true };
    }
}
