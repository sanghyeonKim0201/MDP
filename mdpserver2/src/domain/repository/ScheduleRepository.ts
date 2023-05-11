import { Injectable } from "@nestjs/common";
import { SeatDTO } from "src/dto/ScheduleDto";
import { DataSource, Repository } from "typeorm";
import { Schedule } from "../entity/ScheduleEntity";

@Injectable()
export class ScheduleRepository extends Repository<Schedule>{
    constructor(private dataSoucre: DataSource) {
        super(Schedule, dataSoucre.createEntityManager())
    }

    async findListByUserNo(userNo: string): Promise<Schedule[]> {
        const list = await this.createQueryBuilder("schedules").where("schedules.u_no = :userNo", { userNo: Number.parseInt(userNo) }).getMany()
        return list
    }
    async findByScheduleNo(scheduleNo: string): Promise<Schedule> {
        const result = await this.createQueryBuilder("schedules")
            .leftJoin("schedules.userNo", "users")
            .where("schedules.s_no = :scheduleNo", {scheduleNo : Number.parseInt(scheduleNo)})
            .getOne()

        return result
    }
    async findByVihideId(vihicleId : string) : Promise<Schedule[]>{
        const result = await this.createQueryBuilder("schedules")
        .select("schedules.seat")
        .where("schedules.s_vihicleId = :vihicleId", {vihicleId : vihicleId})
        .getMany()
        return result
    }
}