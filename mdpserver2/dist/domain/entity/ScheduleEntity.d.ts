import { User } from "./UserEntity";
export declare class Schedule {
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
    userNo: User;
}
