import { Inject, Injectable } from "@nestjs/common";
import { PictureRepository } from "src/domain/repository/PictureRepository";
import { PictureDto } from "src/dto/PictureDto";

@Injectable()
export class PictureService{
    constructor(private pictureRepository : PictureRepository){
        this.pictureRepository = pictureRepository
    }

    async postPicture(pictureDto : PictureDto){
        this.pictureRepository.save(pictureDto)
    }
}