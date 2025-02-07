import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constants';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './entities/roles.entity';
import { UserEntity } from './entities/user.entity';
import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [
  TypeOrmModule.forFeature([UserEntity, RolesEntity]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    })
  ],
  providers: [AuthService, RolesService, UsersService],
  controllers: [AuthController, RolesController, UsersController],
  exports: [AuthModule]
})
export class AuthModule {}
