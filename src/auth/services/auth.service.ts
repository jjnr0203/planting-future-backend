import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/auth/services/users.service';
import * as bcryptjs from 'bcryptjs'; 
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}
    async register({username, email, password}: RegisterDto) {
        const user = await this.usersService.findOneByEmail(email);

        if(user) throw new BadRequestException('User already exists');

        await this.usersService.create({
            username, 
            email, 
            password : await bcryptjs.hash(password, 10)
        });

        return { email, username };
    }

    async login({email, password}: LoginDto) {
        const user = await this.usersService.findOneByEmail(email);

        if(!user) throw new UnauthorizedException('email not found');

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if(!isPasswordValid) throw new UnauthorizedException('password not valid');

        const payload = { email : user.email};
        const token = await this.jwtService.sign(payload);
        
        return { user, token };
    }

}
