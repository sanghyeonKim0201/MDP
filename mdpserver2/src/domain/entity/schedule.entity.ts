
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("schedules")
export class Schedule{
    @PrimaryGeneratedColumn({type : "int", name : "s_no"})
    scheduleNo : number
    @Column("varchar", {name : "s_airlineId"})
    airlineId : string
    @Column("varchar", {name : "s_airlineName"})
    airlineName : string
    @Column("varchar", {name : "s_arrAirportId"})
    arrAirportId : string
    @Column("varchar", {name : "s_arrAirportName"})
    arrAirportName : string
    @Column("varchar", {name : "s_arrPlandTime"})
    arrPlandTime : string
    @Column("varchar", {name : "s_depAirportId"})
    depAirportId : string
    @Column("varchar", {name : "s_depAirportName"})
    depAirportName : string
    @Column("varchar", {name : "s_depPlandTime"})
    depPlandTime : string
    @Column("varchar", {name : "s_vihicleId"})
    vihicleId : string
    @ManyToOne(()=>User,(user)=>user.userNo)
    @JoinColumn({name : "u_no"})
    userNo : User
}