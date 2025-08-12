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

    async sendEmail(to: string, username: string, subject: string, text: string, msg: string) {
        const html = `<h3>Welcome ${username}</h3>` + msg
        await this.transporter.sendMail({
            from: `"NestJs Backend" <process.env.email>`,
            to,
            subject,
            text,
            html
        })
    }

}
