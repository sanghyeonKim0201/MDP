import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./UserEntity";

@Entity("fingers")
export class Fingers{
    @PrimaryGeneratedColumn({type : "int", name : "f_no"})
    fingerNo : number
    @Column("int", {name : "f_finger"})
    finger : string
    @ManyToOne(()=>User,(user)=>user.userNo, {cascade : true, eager : true})
    @JoinColumn({name : "u_no"})
    userNo : User
}