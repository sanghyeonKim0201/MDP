import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Schedule } from "../entity/Schedule.entity";

@Injectable()
export class ScheduleRepository extends Repository<Schedule>{
    constructor(private dataSoucre : DataSource){
        super(Schedule, dataSoucre.createEntityManager())
    }

    async findByUserNo(userNo : string) : Promise<Schedule[]>{
        const list = this.createQueryBuilder("schedules").where("schedules.u_no = :userNo", {userNo : Number.parseInt(userNo)}).getMany()
        console.log("repository", list)
        return list
    }
    async findByScheduleNo(scheduleNo : string) : Promise<Schedule>{
        const result = this.createQueryBuilder("schedules").where("schedules.u_no = :userNo", {userNo : Number.parseInt(scheduleNo)}).getOne()
        return result
    }
}