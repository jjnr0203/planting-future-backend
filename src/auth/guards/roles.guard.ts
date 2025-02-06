import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

constructor(private readonly reflector: Reflector){}  
canActivate(
    context: ExecutionContext,
  ): boolean {

    const  roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),context.getClass()
    ]);

    if(!roles){
      return true;
    }

    const  {user} = context.switchToHttp().getRequest().user;
    return roles.some(role => role === user.roles?.includes(role));
    
    console.log(roles)
    return roles === user.roles;
  }
}
