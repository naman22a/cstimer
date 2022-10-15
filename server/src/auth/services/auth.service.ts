import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { v4 } from 'uuid';
import { CONFIRMATION_PREFIX } from '../../constants';
import { redis } from '../../redis';

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
}
