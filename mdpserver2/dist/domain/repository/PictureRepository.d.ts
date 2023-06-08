import { DataSource, Repository } from "typeorm";
import { Picture } from "../entity/PictureEntity";
export declare class PictureRepository extends Repository<Picture> {
    private dataSoucre;
    constructor(dataSoucre: DataSource);
}
