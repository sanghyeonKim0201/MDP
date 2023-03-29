import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("pictures")
export class Picture{
    @PrimaryGeneratedColumn({type : "int", name : "p_no"})
    pictureNo : number
    @Column("longblob",{name : "p_picture"})
    picture : String[]
    @ManyToOne(()=>User, (user)=>user.userNo)
    @JoinColumn({name : "u_no"})
    userNo : User
}