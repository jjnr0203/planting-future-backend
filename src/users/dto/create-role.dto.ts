import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
     @IsInt()
     @IsNotEmpty()
     code: string;

     @IsString()
     @IsNotEmpty()
     name: string;
}   