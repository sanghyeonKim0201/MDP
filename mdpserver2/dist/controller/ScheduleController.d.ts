import { User } from "src/domain/entity/UserEntity";
import { CreateScheduleDTO } from "src/dto/ScheduleDto";
import { ScheduleService } from "src/service/ScheduleService";
export declare class ScheduleController {
    private scheduleService;
    constructor(scheduleService: ScheduleService);
    reservation(createScheduleDTO: CreateScheduleDTO, user: User): Promise<void>;
    reservationList(userNo: string): Promise<void>;
    reservationSeat(vihicleid: string): Promise<void>;
    reservationInfo(scheduleNo: string): Promise<void>;
    reservationDelete(scheduleNo: string): Promise<void>;
}
