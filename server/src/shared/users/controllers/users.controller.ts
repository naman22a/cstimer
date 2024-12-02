import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../../../auth/auth.guard';
import { UsersService } from '../services/users.service';
import { excludeUserDetails } from '../utils';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Get()
    async users() {
        const users = await this.usersService.findAll();
        return users.map((user) => excludeUserDetails(user));
    }

    @Get('me')
    @UseGuards(AuthGuard)
    async me(@Req() req: Request) {
        const { userId } = req.session;
        const user = await this.usersService.findOneById(userId);
        return excludeUserDetails(user);
    }
}
