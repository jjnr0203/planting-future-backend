import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { RolesService } from "./roles.service";

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    async create(@Body() payload: CreateRoleDto) {
      const role = await this.rolesService.create(payload);
      return role;
    }
  
    @Get()
    async findAll() {
      const roles = await this.rolesService.findAll();
      return roles;
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const role = await this.rolesService.findOne(id);
      return role;
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      const role = await this.rolesService.delete(id);
      return role;
    }
} 