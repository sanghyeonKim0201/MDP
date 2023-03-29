import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("fingers")
export class Fingers{
    @PrimaryGeneratedColumn({type : "int", name : "f_no"})
    fingerNo : number
    @Column("int", {name : "f_finger"})
    finger : String
    @ManyToOne(()=>User,(user)=>user.userNo)
    @JoinColumn({name : "u_no"})
    userNo : User
}