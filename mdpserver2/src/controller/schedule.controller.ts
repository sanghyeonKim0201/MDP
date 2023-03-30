import { Controller, Delete, Get, HttpException, Param, Post, Query } from "@nestjs/common";
import { CreateScheduleDTO } from "src/dto/schedule.dto";
import { ScheduleService } from "src/service/schedule.service";

@Controller("api/schedules")
export class ScheduleController{

    constructor(private scheduleService : ScheduleService){
        this.scheduleService = scheduleService
    }

    @Post("/reservation")
    async reservation(createScheduleDTO : CreateScheduleDTO){
        await this.scheduleService.createReservation(createScheduleDTO)
        throw new HttpException(Object.assign({
            statusCode : 200,
            message : "에약이 완료되었습니다",
        }),200)
    }
    @Get()
    async reservationList(@Query("userNo")userNo : string){
        const result = await this.scheduleService.getScheduleList(userNo)
        throw new HttpException(Object.assign({
            statusCode : 200,
            message : "예약 리스트를 성공적으로 불러왔습니다",
            ...result
        }),200)
    }
    @Get(":scheduleNo")
    async reservationInfo(){
        
    }
    @Delete(":scheduleNo")
    async reservationDelete(@Param("scheduleNo")scheduleNo : string){
        await this.scheduleService.deleteReservation(scheduleNo)
        throw new HttpException(Object.assign({
            statusCode : 200,
            message : "삭제가 완료되었습니다",
        }),200)
    }
}