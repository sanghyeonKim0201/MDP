import { Module } from "@nestjs/common";
import { ScheduleController } from "src/controller/ScheduleController";
import { ScheduleRepository } from "src/domain/repository/ScheduleRepository";
import { ScheduleService } from "src/service/ScheduleService";
import { UserModule } from "./UserModule";

@Module({
    imports : [UserModule],
    controllers : [ScheduleController],
    providers : [ScheduleRepository, ScheduleService]
})
export class ScheduleModule{

}