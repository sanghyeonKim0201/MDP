import { User } from "src/domain/entity/user.entity"

export class ScheduleDTO {
    scheduleNo: number
    airlineId: string
    airlineName: string
    arrAirportId: string
    arrAirportName: string
    arrPlandTime: string
    depAirportId: string
    depAirportName: string
    depPlandTime: string
    vihicleId: string
    userNo: User
}

export class CreateScheduleDTO{
    airlineId: string
    airlineName: string
    arrAirportId: string
    arrAirportName: string
    arrPlandTime: string
    depAirportId: string
    depAirportName: string
    depPlandTime: string
    vihicleId: string
    userNo: User
}