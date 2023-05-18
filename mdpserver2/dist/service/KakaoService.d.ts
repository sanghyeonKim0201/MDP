import { KakaoRepository } from "src/domain/repository/KakaoRepository";
import { CreateKakaoScheduleDTO, KakaoDTO } from "src/dto/KakaoDto";
export declare class KakaoService {
    private kakaoRepository;
    constructor(kakaoRepository: KakaoRepository);
    getKakaoScheduleList(kakaoEmail: string): Promise<KakaoDTO[] | undefined | null>;
    createKakaoSchedule(createScheduleKakaoDTO: CreateKakaoScheduleDTO): Promise<void>;
    deleteKakaoSchedule(kakaoScheduleNo: string): Promise<void>;
    getKakaoSchedule(kakaoSchedule: string): Promise<KakaoDTO>;
}
