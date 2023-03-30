import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity({ schema: "mdp", name: "users" })
@Unique(["userId"])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn({ type: "int", name: "u_no" })
    userNo: number
    @Column("varchar", { name: "u_id" })
    userId: string
    @Column("varchar", { name: "u_pw" })
    userPw: string
    @Column('varchar', { name: 'u_phone' })
    userPhone: string
    @Column('varchar', { name: "u_birth" })
    userBirth: string
    @Column('varchar', { name: "u_name1" })
    userName1: string
    @Column('varchar', { name: 'u_name2' })
    userName2: string

}