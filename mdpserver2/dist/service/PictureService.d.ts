import { PictureRepository } from "src/domain/repository/PictureRepository";
import { PictureDto } from "src/dto/PictureDto";
export declare class PictureService {
    private pictureRepository;
    constructor(pictureRepository: PictureRepository);
    postPicture(pictureDto: PictureDto): Promise<void>;
}
