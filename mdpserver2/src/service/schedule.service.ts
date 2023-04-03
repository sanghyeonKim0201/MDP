import { HttpException, Injectable } from "@nestjs/common";
import { Schedule } from "src/domain/entity/Schedule.entity";
import { ScheduleRepository } from "src/domain/repository/schedule.repository";
import { CreateScheduleDTO } from "src/dto/schedule.dto";

@Injectable()
export class ScheduleService{
    constructor(private scheduleRepository : ScheduleRepository){
        this.scheduleRepository = scheduleRepository
    }

    async getScheduleList(userNo : string) : Promise<Schedule[] | undefined | null>{
        const result = await this.scheduleRepository.findListByUserNo(userNo)
        if(result.length <= 0){
            throw new HttpException(Object.assign({
                statusCode : 404,
                message : "예약일정이 없습니다",
            }),404)
        }
        return result
    }
    async createSchedule(createScheduleDTO : CreateScheduleDTO) : Promise<void>{
        await this.scheduleRepository.save(createScheduleDTO)
        return Promise.resolve()
    }
    async deleteSchedule(scheduleNo : string) : Promise<void>{
        const find = await this.scheduleRepository.findByScheduleNo(scheduleNo)
        if(!find){
            throw new HttpException(Object.assign({
                statusCode : 404,
                message : "스케줄에 대한 정보가 없습니다",
            }),404)
        }
        await this.scheduleRepository.delete(scheduleNo)
        return Promise.resolve()
    }
    async getSchedule(schedule : string) : Promise<Schedule>{
        const find = await this.scheduleRepository.findByScheduleNo(schedule)
        if(!find){
            throw new HttpException(Object.assign({
                statusCode : 404,
                message : "스케줄에 대한 정보가 없습니다",
            }),404)
        }

        return find
    }
}