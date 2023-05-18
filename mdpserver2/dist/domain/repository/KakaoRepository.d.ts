import { DataSource, Repository } from "typeorm";
import { Kakao } from "../entity/KakaoEntity";
export declare class KakaoRepository extends Repository<Kakao> {
    private dataSoucre;
    constructor(dataSoucre: DataSource);
    findListByKakaoEmail(kakaoEmail: string): Promise<Kakao[]>;
    findByKakaoScheduleNo(kakaoScheduleNo: string): Promise<Kakao>;
}
