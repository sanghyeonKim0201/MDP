import { Module } from "@nestjs/common";
import { PictureController } from "src/controller/PictureController";
import { PictureRepository } from "src/domain/repository/PictureRepository";
import { PictureService } from "src/service/PictureService";

@Module({
    imports : [],
    controllers : [PictureController],
    providers : [PictureRepository, PictureService]
})
export class PictureModule{

}