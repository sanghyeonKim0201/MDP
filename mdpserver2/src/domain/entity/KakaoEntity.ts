
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("kakaos")
export class Kakao {
    @PrimaryGeneratedColumn({type : "int", name : "kakao_scheduleNo"})
    kakaoScheduleNo: string
    @Column("varchar", { name: "kakao_airlineId" })
    airlineId: string
    @Column("varchar", { name: "kakao_airlineName" })
    airlineName: string
    @Column("varchar", { name: "kakao_arrAirportId" })
    arrAirportId: string
    @Column("varchar", { name: "kakao_arrAirportName" })
    arrAirportName: string
    @Column("varchar", { name: "kakao_arrPlandTime" })
    arrPlandTime: string
    @Column("varchar", { name: "kakao_depAirportId" })
    depAirportId: string
    @Column("varchar", { name: "kakao_depAirportName" })
    depAirportName: string
    @Column("varchar", { name: "kakao_depPlandTime" })
    depPlandTime: string
    @Column("varchar", { name: "kakao_vihicleId" })
    vihicleId: string
    @Column("varchar", {name : "kakao_email"})
    kakaoEmail : string
}