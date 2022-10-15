import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { excludeUserDetails } from '../utils';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Get()
    async users() {
        const users = await this.usersService.findAll();
        return users.map((user) => excludeUserDetails(user));
    }
}
