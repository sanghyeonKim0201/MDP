import { Body, Controller, Delete, Get, HttpException, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateKakaoScheduleDTO, KakaoDTO } from "src/dto/KakaoDto";
import { KakaoService } from "src/service/KakaoService";
import { KakaoListResponseData } from "src/swagger/response/KakaoResponse";
import { FailResponseData, SuccessResponseData } from "src/swagger/response/UserResponse";

@Controller("api/kakao")
export class KakaoController{ 
    constructor(private kakaoService : KakaoService){
        this.kakaoService = kakaoService
    }
    @Post("reservation")
    @ApiOperation({
        summary : "kakaoreservationAPI",
        description : "카카오 예약일정 등록에 대한 API"
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
    async reservation(@Body()createKakaoScheduleDTO : CreateKakaoScheduleDTO){
        await this.kakaoService.createKakaoSchedule(createKakaoScheduleDTO)
        throw new HttpException(Object.assign({
            statusCode : 200,
            message : "에약이 완료되었습니다",
        }),200)
    }
    @Get()
    @ApiOperation({
        summary : "kakaoreservationListAPI",
        description : "카카오 모든 예약일정을 불러오는 API"
    })
    @ApiResponse({
        type : KakaoListResponseData,
        status : 200,
        description : "success"
    })
    @ApiResponse({
        status : 400,
        description : "fail",
        type : FailResponseData
    })
    async reservationList(@Query("kakaoemail")kakaoEmail : string){
        const result = await this.kakaoService.getKakaoScheduleList(kakaoEmail)
        throw new HttpException(Object.assign({
            list : result
        }),200)
    }
    @Get(":kakaoscheduleno")
    @ApiOperation({
        summary : "reservationInfoAPI",
        description : "선택한 예약일정의 내용을 불러오는 API"
    })
    @ApiResponse({
        type : KakaoDTO,
        status : 200,
        description : "success"
    })
    @ApiResponse({
        status : 400,
        description : "fail",
        type : FailResponseData
    })
    async reservationInfo(@Param("kakaoscheduleno")kakaoscheduleNo : string){
        const result = await this.kakaoService.getKakaoSchedule(kakaoscheduleNo)
        throw new HttpException(Object.assign({
            ...result
        }),200)
    }
    @Delete(":kakaoscheduleno")
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
    async reservationDelete(@Param("kakaoscheduleno")kakaoscheduleNo : string){
        await this.kakaoService.deleteKakaoSchedule(kakaoscheduleNo)
        throw new HttpException(Object.assign({
            statusCode : 200,
            message : "삭제가 완료되었습니다",
        }),200)
    }
}