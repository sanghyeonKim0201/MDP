import { HttpException, Injectable } from "@nestjs/common";
import { KakaoRepository } from "src/domain/repository/KakaoRepository";
import { CreateKakaoScheduleDTO, KakaoDTO } from "src/dto/KakaoDto";

@Injectable()
export class KakaoService{
    constructor(private kakaoRepository :KakaoRepository){
        this.kakaoRepository = kakaoRepository
    }
    async getKakaoScheduleList(kakaoEmail : string) : Promise<KakaoDTO[] | undefined | null>{
        const result = await this.kakaoRepository.findListByKakaoEmail(kakaoEmail)
        if(result.length <= 0){
            throw new HttpException(Object.assign({
                statusCode : 404,
                message : "예약일정이 없습니다",
            }),404)
        }
        return result
    }
    async createKakaoSchedule(createScheduleKakaoDTO : CreateKakaoScheduleDTO) : Promise<void>{
        await this.kakaoRepository.save(createScheduleKakaoDTO)
        return Promise.resolve()
    }
    async deleteKakaoSchedule(kakaoScheduleNo : string) : Promise<void>{
        const find = await this.kakaoRepository.findByKakaoScheduleNo(kakaoScheduleNo)
        if(!find){
            throw new HttpException(Object.assign({
                statusCode : 404,
                message : "스케줄에 대한 정보가 없습니다",
            }),404)
        }
        await this.kakaoRepository.delete(kakaoScheduleNo)
        return Promise.resolve()
    }
    async getKakaoSchedule(kakaoSchedule : string) : Promise<KakaoDTO>{
        const find = await this.kakaoRepository.findByKakaoScheduleNo(kakaoSchedule)
        if(!find){
            throw new HttpException(Object.assign({
                statusCode : 404,
                message : "스케줄에 대한 정보가 없습니다",
            }),404)
        }

        return find
    }
}