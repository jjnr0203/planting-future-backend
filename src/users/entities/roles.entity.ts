import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class RolesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true, nullable: false})
    code: string;

    @Column({unique: true, nullable: false})
    name: string;

    @DeleteDateColumn()
    deletedAt: Date
    
}