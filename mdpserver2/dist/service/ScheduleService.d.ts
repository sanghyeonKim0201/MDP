import { ScheduleRepository } from "src/domain/repository/ScheduleRepository";
import { CreateScheduleDTO, ScheduleDTO } from "src/dto/ScheduleDto";
export declare class ScheduleService {
    private scheduleRepository;
    constructor(scheduleRepository: ScheduleRepository);
    getScheduleList(userNo: string): Promise<ScheduleDTO[] | undefined | null>;
    createSchedule(createScheduleDTO: CreateScheduleDTO): Promise<void>;
    deleteSchedule(scheduleNo: string): Promise<void>;
    getSchedule(schedule: string): Promise<ScheduleDTO>;
    getSeat(vihicleId: string): Promise<ScheduleDTO[] | undefined | null>;
}
