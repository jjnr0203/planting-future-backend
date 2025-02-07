import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolesEntity } from "./roles.entity";
import * as bcryptjs from 'bcryptjs'

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    username: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    //@Column({default: 'user'})
    //role: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToMany(() => RolesEntity, {cascade:true})
    @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
    })
    roles: RolesEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(this.password){
            this.password = await bcryptjs.hash(this.password, 10)
    }
  }
}
