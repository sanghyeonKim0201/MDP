import { UserDTO } from "./UserDto";
export declare class ScheduleDTO {
    scheduleNo: number;
    airlineId: string;
    airlineName: string;
    arrAirportId: string;
    arrAirportName: string;
    arrPlandTime: string;
    depAirportId: string;
    depAirportName: string;
    depPlandTime: string;
    vihicleId: string;
    seat: string;
    userNo: UserDTO;
}
export declare class CreateScheduleDTO {
    airlineId: string;
    airlineName: string;
    arrAirportId: string;
    arrAirportName: string;
    arrPlandTime: string;
    depAirportId: string;
    depAirportName: string;
    depPlandTime: string;
    vihicleId: string;
    seat: string;
    userNo: UserDTO;
}
export declare class SeatDTO {
    seat: string;
}
