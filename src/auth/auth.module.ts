import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './entities/roles.entity';
import { UserEntity } from './entities/user.entity';
import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './services/email.service';
import { EmailController } from './controllers/email.controller';
import { jwtConstants } from './config/envs';

@Module({
  imports: [
  ConfigModule.forRoot(),  
  TypeOrmModule.forFeature([UserEntity, RolesEntity]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    })
  ],
  providers: [AuthService, RolesService, UsersService, EmailService],
  controllers: [AuthController, RolesController, UsersController, EmailController],
  exports: [AuthModule]
})
export class AuthModule {}
