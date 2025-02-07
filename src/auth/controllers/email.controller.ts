import { Body, Controller, Post } from "@nestjs/common";
import { EmailService } from "../services/email.service";
import { SendEmailDto } from "../dto/email/send-email.dto";

@Controller('email')
export class EmailController {
    constructor(
        private readonly emailService: EmailService,
    ) {}

    @Post('send-email')
    async create(@Body() sendEmailDto : SendEmailDto) {
        return this.emailService.sendEmail(sendEmailDto);
    }
}