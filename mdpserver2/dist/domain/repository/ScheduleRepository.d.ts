import { DataSource, Repository } from "typeorm";
import { Schedule } from "../entity/ScheduleEntity";
export declare class ScheduleRepository extends Repository<Schedule> {
    private dataSoucre;
    constructor(dataSoucre: DataSource);
    findListByUserNo(userNo: string): Promise<Schedule[]>;
    findByScheduleNo(scheduleNo: string): Promise<Schedule>;
    findByVihideId(vihicleId: string): Promise<Schedule[]>;
}
