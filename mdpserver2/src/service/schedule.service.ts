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
        const result = await this.scheduleRepository.findByUserNo(userNo)
        if(!result){
            throw new HttpException(Object.assign({
                statusCode : 401,
                message : "예약일정이 없습니다",
            }),401)
        }
        return result
    }
    async createReservation(createScheduleDTO : CreateScheduleDTO) : Promise<void>{
        await this.scheduleRepository.save(createScheduleDTO)
        return Promise.resolve()
    }
    async deleteReservation(scheduleNo : string) : Promise<void>{
        const find = this.scheduleRepository.findByScheduleNo(scheduleNo)
        if(!find){
            throw new HttpException(Object.assign({
                statusCode : 401,
                message : "없는 예약입니다",
            }),401)
        }
        await this.scheduleRepository.delete(scheduleNo)
        return Promise.resolve()
    }
}