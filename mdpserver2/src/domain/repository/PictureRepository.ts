import { Injectable } from "@nestjs/common";
import { PictureDto } from "src/dto/PictureDto";
import { DataSource, Repository } from "typeorm";
import { Picture } from "../entity/PictureEntity";

@Injectable()
export class PictureRepository extends Repository<Picture>{
    constructor(private dataSoucre : DataSource){
        super(Picture, dataSoucre.createEntityManager())
    }
    

}