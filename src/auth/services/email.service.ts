import * as nodemailer from 'nodemailer';
import { envs } from '../config/envs';
import { Injectable } from '@nestjs/common';
import { SendEmailDto } from '../dto/email/send-email.dto';

@Injectable()
export class EmailService {

    constructor () {}

    private readonly transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_KEY,
        },
    });

    async sendEmail(sendEmailDto : SendEmailDto){
        const { content, subject, title, to = [] } = sendEmailDto;

        const htmlBody = `
        <h2>${title}</h2>
        <p>${content}</p>
        `;

        try {
            await this.transporter.sendMail({
                from : {
                    name : envs.MAILER_NAME,
                    address : envs.MAILER_EMAIL
                },
                bcc: to,
                subject,
                html: htmlBody
            });
            return { message: 'Email sent successfully' };

        } catch (error) {
            console.log(error);
        }
    }
}