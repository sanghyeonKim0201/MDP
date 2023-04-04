import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./UserEntity";

@Entity("pictures")
export class Picture{
    @PrimaryGeneratedColumn({type : "int", name : "p_no"})
    pictureNo : number
    @Column("longblob",{name : "p_picture"})
    picture : string[]
    @ManyToOne(()=>User, (user)=>user.userNo, {cascade : true, eager : true})
    @JoinColumn({name : "u_no"})
    userNo : User
}