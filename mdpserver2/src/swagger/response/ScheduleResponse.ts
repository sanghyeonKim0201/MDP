import { ApiProperty } from "@nestjs/swagger";
import { ScheduleDTO } from "src/dto/ScheduleDto";

export class reservationListResponseData{
    @ApiProperty({
        isArray : true
    })
    list : ScheduleDTO[]
}