import { Body, Controller, Delete, Get, HttpException, Param, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetUesr } from "src/Decorator";
import { User } from "src/domain/entity/user.entity";
import { CreateScheduleDTO, ScheduleDTO } from "src/dto/schedule.dto";
import { ScheduleService } from "src/service/schedule.service";
import { reservationListResponseData } from "src/swagger/response/schedule.response";
import { FailResponseData, SuccessResponseData } from "src/swagger/response/user.response";

@ApiTags("schedules")
@Controller("api/schedules")
@UseGuards(AuthGuard())
export class ScheduleController{

    constructor(private scheduleService : ScheduleService){
        this.scheduleService = scheduleService
    }

    @Post("reservation")
    @ApiBearerAuth()
    @ApiOperation({
        summary : "reservationAPI",
        description : "예약일정 등록에 대한 API"
    })
    @ApiResponse({
        type : SuccessResponseData,
        status : 200,
        description : "success"
    })
    @ApiResponse({
        status : 400,
        description : "fail",
        type : FailResponseData
    })
    async reservation(@Body()createScheduleDTO : CreateScheduleDTO, @GetUesr() user : User){
        createScheduleDTO.userNo = user
        console.log(createScheduleDTO)
        await this.scheduleService.createSchedule(createScheduleDTO)
        throw new HttpException(Object.assign({
            statusCode : 200,
            message : "에약이 완료되었습니다",
        }),200)
    }
    @Get()
    @ApiBearerAuth()
    @ApiOperation({
        summary : "reservationListAPI",
        description : "모든 예약일정을 불러오는 API"
    })
    @ApiResponse({
        type : reservationListResponseData,
        status : 200,
        description : "success"
    })
    @ApiResponse({
        status : 400,
        description : "fail",
        type : FailResponseData
    })
    async reservationList(@Query("userNo")userNo : string){
        const result = await this.scheduleService.getScheduleList(userNo)
        throw new HttpException(Object.assign({
            list : result
        }),200)
    }
    @Get(":scheduleNo")
    @ApiBearerAuth()
    @ApiOperation({
        summary : "reservationInfoAPI",
        description : "선택한 예약일정의 내용을 불러오는 API"
    })
    @ApiResponse({
        type : ScheduleDTO,
        status : 200,
        description : "success"
    })
    @ApiResponse({
        status : 400,
        description : "fail",
        type : FailResponseData
    })
    async reservationInfo(@Param("scheduleNo")scheduleNo : string){
        const result = await this.scheduleService.getSchedule(scheduleNo)
        throw new HttpException(Object.assign({
            ...result
        }),200)
    }
    @Delete(":scheduleNo")
    @ApiBearerAuth()
    @ApiOperation({
        summary : "reservationDeleteAPI",
        description : "예약일정을 삭제하는 API"
    })
    @ApiResponse({
        type : SuccessResponseData,
        status : 200,
        description : "success"
    })
    @ApiResponse({
        status : 400,
        description : "fail",
        type : FailResponseData
    })
    async reservationDelete(@Param("scheduleNo")scheduleNo : string){
        await this.scheduleService.deleteSchedule(scheduleNo)
        throw new HttpException(Object.assign({
            statusCode : 200,
            message : "삭제가 완료되었습니다",
        }),200)
    }
}