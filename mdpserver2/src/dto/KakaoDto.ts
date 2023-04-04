import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class KakaoDTO {
    @IsNumber()
    @ApiProperty({
        example : 1,
        description : "스케줄 번호"
    })
    kakaoScheduleNo: string
    @IsString()
    @ApiProperty({
        example : "JJA",
        description : "항공사의 아이디"
    })
    airlineId : string
    @IsString()
    @ApiProperty({
        example : "아시아나항공",
        description : "항공사의 이름"
    })
    airlineName : string
    @IsString()
    @ApiProperty({
        example : "PSCRPP",
        description : "도착 공항의 아이디"
    })
    arrAirportId : string
    @IsString()
    @ApiProperty({
        example : "인천",
        description : "도착 공항의 이름"
    })
    arrAirportName : string
    @IsString()
    @ApiProperty({
        example : "2023-04-02 11:00",
        description : "도착 시간"
    })
    arrPlandTime : string
    @IsString()
    @ApiProperty({
        example : "PCSRQS",
        description : "출발 공항의 아이디"
    })
    depAirportId : string
    @IsString()
    @ApiProperty({
        example : "제주",
        description : "출발 공항의 이름"
    })
    depAirportName : string
    @IsString()
    @ApiProperty({
        example : "2023-04-02 10:00",
        description : "도착 시간"
    })
    depPlandTime : string
    @IsString()
    @ApiProperty({
        example : "JW900",
        description : "항공편명"
    })
    vihicleId : string
    @IsString()
    @ApiProperty({
        example : "gmhty4345@gmail.com",
        description : "카카오계정"
    })
    kakaoEmail : string
}

export class CreateKakaoScheduleDTO{
    @IsString()
    @ApiProperty({
        example : "JJA",
        description : "항공사의 아이디"
    })
    airlineId : string
    @IsString()
    @ApiProperty({
        example : "아시아나항공",
        description : "항공사의 이름"
    })
    airlineName : string
    @IsString()
    @ApiProperty({
        example : "PSCRPP",
        description : "도착 공항의 아이디"
    })
    arrAirportId : string
    @IsString()
    @ApiProperty({
        example : "인천",
        description : "도착 공항의 이름"
    })
    arrAirportName : string
    @IsString()
    @ApiProperty({
        example : "2023-04-02 11:00",
        description : "도착 시간"
    })
    arrPlandTime : string
    @IsString()
    @ApiProperty({
        example : "PCSRQS",
        description : "출발 공항의 아이디"
    })
    depAirportId : string
    @IsString()
    @ApiProperty({
        example : "제주",
        description : "출발 공항의 이름"
    })
    depAirportName : string
    @IsString()
    @ApiProperty({
        example : "2023-04-02 10:00",
        description : "도착 시간"
    })
    depPlandTime : string
    @IsString()
    @ApiProperty({
        example : "JW900",
        description : "항공편명"
    })
    vihicleId : string
    @IsString()
    @ApiProperty({
        example : "gmhty4345@gmail.com",
        description : "카카오계정"
    })
    kakaoEmail : string
}