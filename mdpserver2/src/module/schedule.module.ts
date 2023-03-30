import { Module } from "@nestjs/common";
import { ScheduleController } from "src/controller/schedule.controller";
import { ScheduleRepository } from "src/domain/repository/schedule.repository";
import { ScheduleService } from "src/service/schedule.service";
import { UserModule } from "./user.module";

@Module({
    imports : [UserModule],
    controllers : [ScheduleController],
    providers : [ScheduleRepository, ScheduleService]
})
export class ScheduleModule{

}