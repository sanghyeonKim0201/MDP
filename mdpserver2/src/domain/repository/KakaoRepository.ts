import { Injectable } from "@nestjs/common"
import { DataSource, Repository } from "typeorm"
import { Kakao } from "../entity/KakaoEntity"

@Injectable()
export class KakaoRepository extends Repository<Kakao>{
    constructor(private dataSoucre: DataSource) {
        super(Kakao, dataSoucre.createEntityManager())
    }
    async findListByKakaoEmail(kakaoEmail: string): Promise<Kakao[]> {
        const list = await this.createQueryBuilder("Kakaos").where("Kakaos.kakao_email = :kakaoEmail", { kakaoEmail: kakaoEmail }).getMany()
        return list
    }
    async findByKakaoScheduleNo(kakaoScheduleNo: string): Promise<Kakao> {
        const result = await this.createQueryBuilder("Kakaos")
            .where("Kakaos.kakao_scheduleNo = :kakaoScheduleNo", {kakaoScheduleNo : Number.parseInt(kakaoScheduleNo)})
            .getOne()
        return result
    }
}