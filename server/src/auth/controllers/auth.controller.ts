import {
    Body,
    Controller,
    Param,
    ParseUUIDPipe,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { OkResponse } from '../../types';
import { UsersService } from '../../users/services/users.service';
import {
    ForgotPasswordDto,
    LoginDto,
    RegisterDto,
    ResetPasswordDto,
} from '../types';
import * as argon2 from 'argon2';
import { AuthService } from '../services/auth.service';
import { redis } from '../../redis';
import {
    CONFIRMATION_PREFIX,
    COOKIE_NAME,
    FORGOT_PASSWORD_PREFIX,
} from '../../constants';
import { Request, Response } from 'express';
import { AuthGuard } from '../auth.guard';
import { SessionsService } from '../../sessions/services/sessions.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private sessionService: SessionsService,
    ) {}

    @Post('register')
    async register(
        @Body() body: RegisterDto,
        @Req() req: Request,
    ): Promise<OkResponse> {
        const { name, email, password } = body;

        // check if user already exists
        const userExists = await this.usersService.findOneByEmail(email);
        if (userExists) {
            return {
                ok: false,
                errors: [{ field: 'email', message: 'Email already in use' }],
            };
        }

        // hashing the password
        const hashedPasword = await argon2.hash(password);

        // save user to database
        const user = await this.usersService.create({
            name,
            email,
            password: hashedPasword,
        });

        // send a confirmation email to user
        const url = await this.authService.createConfirmationUrl(user.id);
        await this.authService.sendEmail(email, url);

        // create default session
        const defaultSession = await this.sessionService.create(user.id, '1');
        req.session.sessionId = defaultSession.id;

        return { ok: true };
    }

    @Post('confirm/:token')
    async confirmEmail(
        @Param('token', new ParseUUIDPipe({ version: '4' })) token: string,
    ): Promise<OkResponse> {
        const userId = await redis.get(CONFIRMATION_PREFIX + token);
        if (!userId) return { ok: false };

        const user = await this.usersService.findOneById(parseInt(userId, 10));
        if (!user) return { ok: false };

        const x = await this.usersService.confirm(user.id);
        if (x.count === 0) return { ok: false };

        await redis.del(CONFIRMATION_PREFIX + token);

        return { ok: true };
    }

    @Post('login')
    async login(
        @Body() body: LoginDto,
        @Req() req: Request,
    ): Promise<OkResponse> {
        const { email, password } = body;

        // check if user exists in database
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            return {
                ok: false,
                errors: [{ field: 'email', message: 'User not found' }],
            };
        }

        // check if password is correct
        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return {
                ok: false,
                errors: [{ field: 'password', message: 'Incorrect password' }],
            };
        }

        // check if user has confirmed email
        if (!user.confirmed) {
            return {
                ok: false,
                errors: [
                    { field: 'email', message: 'Please confirm your email' },
                ],
            };
        }

        // set default session on login
        const session = await this.sessionService.findAnyOne(user.id);
        if (!session) {
            const defaultSession = await this.sessionService.create(
                user.id,
                '1',
            );
            req.session.sessionId = defaultSession.id;
        } else {
            req.session.sessionId = session.id;
        }

        req.session.userId = user.id;

        return { ok: true };
    }

    @Post('logout')
    @UseGuards(AuthGuard)
    logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<OkResponse> {
        return new Promise((resolve) =>
            req.session.destroy((error) => {
                if (error) {
                    resolve({
                        ok: false,
                        errors: [
                            {
                                field: 'server',
                                message: 'Something went wrong',
                            },
                        ],
                    });
                }
                res.clearCookie(COOKIE_NAME);
                resolve({ ok: true });
            }),
        );
    }

    @Post('forgot-password')
    async forgotPassword(
        @Body() { email }: ForgotPasswordDto,
    ): Promise<OkResponse> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) return { ok: true };

        const url = await this.authService.createForgotPasswordUrl(user.id);
        await this.authService.sendEmail(email, url);

        return { ok: true };
    }

    @Post('reset-password/:token')
    async resetPassword(
        @Body() { password }: ResetPasswordDto,
        @Param('token', new ParseUUIDPipe({ version: '4' })) token: string,
    ): Promise<OkResponse> {
        const userId = await redis.get(FORGOT_PASSWORD_PREFIX + token);
        if (!userId) return { ok: false };

        const user = await this.usersService.findOneById(parseInt(userId, 10));
        if (!user) return { ok: false };

        const hashedPassword = await argon2.hash(password);

        const x = await this.usersService.updatePassword(
            user.id,
            hashedPassword,
        );
        if (x.count === 0) return { ok: false };

        await redis.del(FORGOT_PASSWORD_PREFIX + token);

        return { ok: true };
    }
}
