import { ApiProperty } from "@nestjs/swagger";
import { ScheduleDTO } from "src/dto/schedule.dto";

export class reservationListResponseData{
    @ApiProperty({
        isArray : true
    })
    list : ScheduleDTO[]
}