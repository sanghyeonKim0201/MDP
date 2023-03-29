import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ schema: "mdp", name: "users" })
export class User extends BaseEntity{
    @PrimaryGeneratedColumn({ type: "int", name: "u_no" })
    userNo: number
    @Column("varchar", { name: "u_id" })
    userId: String
    @Column("varchar", { name: "u_pw" })
    userPw: String
    @Column('varchar', { name: 'u_phone' })
    userPhone: String
    @Column('varchar', { name: "u_birth" })
    userBirth: String
    @Column('varchar', { name: "u_name1" })
    userName1: String
    @Column('varchar', { name: 'u_name2' })
    userName2: String

}