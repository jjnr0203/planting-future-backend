import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RolesEntity } from "../entities/roles.entity";
import { CreateRoleDto } from "../dto/roles/create-role.dto";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(RolesEntity)
        private readonly rolesRepository: Repository<RolesEntity>
    ) {}
    
    async create(payload: CreateRoleDto) {
        const informationUser = await this.rolesRepository.create(payload);
        await this.rolesRepository.save(informationUser);
        return informationUser;
      }
    
      async findAll() {
        const informationUsers = await this.rolesRepository.find();
        return informationUsers;
      }
    
      async findOne(id: string) {
        const informationUser = await this.rolesRepository.findOne({
          where: { id: id },
        });
        return informationUser;
      }
    
      async findByCode(id: string) {
        const informationUser = await this.rolesRepository.findOne({
          where: { code: id },
        });
        return informationUser;
      }

      async delete(id: string) {
        const informationUser = await this.rolesRepository.softDelete(id);
        return informationUser;
      }
    
      async insertMany(payload: CreateRoleDto[]) {
        const roles = this.rolesRepository.save(payload);
        return roles;
      }
}