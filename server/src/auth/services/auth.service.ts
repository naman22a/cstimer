import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { v4 } from 'uuid';
import {
    CONFIRMATION_PREFIX,
    FORGOT_PASSWORD_PREFIX,
} from '../../common/constants';
import { redis } from '../../common/redis';

@Injectable()
export class AuthService {
    async sendEmail(email: string, url: string) {
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        let info = await transporter.sendMail({
            from: '"CsTimer 👻" <cstimer@gmail.com>',
            to: email,
            html: `<a href="${url}">${url}</a>`,
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    async createConfirmationUrl(userId: number) {
        const token = v4();
        await redis.set(
            CONFIRMATION_PREFIX + token,
            userId,
            'EX',
            3600 * 24 * 3, // 3 days
        );
        return `http://localhost:3000/confirm/${token}`;
    }

    async createForgotPasswordUrl(userId: number) {
        const token = v4();
        await redis.set(FORGOT_PASSWORD_PREFIX + token, userId, 'EX', 3600 * 5); // 5 hrs
        return `http://localhost:3000/reset-password/${token}`;
    }
}
