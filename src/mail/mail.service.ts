import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.email,
                pass: process.env.pass
            }
        })
    }

    async sendRegisterEmail(to: string, username: string) {
        await this.transporter.sendMail({
            from: `"NestJs Backend" <process.env.email>`,
            to,
            subject: 'Register Notification',
            text: `Hello ${username}, your account usage is just a login away!`,
            html: `<p>Welcome, <strong>${username}</strong></p>
                    <p>Your account has been successfully created!</p>`
        })
    }
}
