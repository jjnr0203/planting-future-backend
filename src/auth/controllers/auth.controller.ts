import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RequestWithUser } from '../interfaces/request.interface';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    //@Roles(['user', 'admin', 'super-admin'])
    @UseGuards(AuthGuard)
    profile(@Req() req : RequestWithUser) {
        return req.user;
    }
}
