
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("schedules")
export class Schedule{
    @PrimaryGeneratedColumn({type : "int", name : "s_no"})
    scheduleNo : number
    @Column("varchar", {name : "s_airlineId"})
    airlineId : String
    @Column("varchar", {name : "s_airlineName"})
    airlineName : String
    @Column("varchar", {name : "s_arrAirportId"})
    arrAirportId : String
    @Column("varchar", {name : "s_arrAirportName"})
    arrAirportName : String
    @Column("varchar", {name : "s_arrPlandTime"})
    arrPlandTime : String
    @Column("varchar", {name : "s_depAirportId"})
    depAirportId : String
    @Column("varchar", {name : "s_depAirportName"})
    depAirportName : String
    @Column("varchar", {name : "s_depPlandTime"})
    depPlandTime : String
    @Column("varchar", {name : "s_vihicleId"})
    vihicleId : String
    @ManyToOne(()=>User,(user)=>user.userNo)
    @JoinColumn({name : "u_no"})
    userNo : User
}