import { ApiProperty } from "@nestjs/swagger";
import { ScheduleDTO, SeatDTO } from "src/dto/ScheduleDto";

export class reservationListResponseData{
    @ApiProperty({
        isArray : true
    })
    list : ScheduleDTO[]
}
export class reservationSeatListResponseData{
    @ApiProperty({
        isArray : true
    })
    list : SeatDTO[]
}