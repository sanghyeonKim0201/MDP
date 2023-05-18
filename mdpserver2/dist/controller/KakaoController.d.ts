import { CreateKakaoScheduleDTO } from "src/dto/KakaoDto";
import { KakaoService } from "src/service/KakaoService";
export declare class KakaoController {
    private kakaoService;
    constructor(kakaoService: KakaoService);
    reservation(createKakaoScheduleDTO: CreateKakaoScheduleDTO): Promise<void>;
    reservationList(kakaoEmail: string): Promise<void>;
    reservationInfo(kakaoscheduleNo: string): Promise<void>;
    reservationDelete(kakaoscheduleNo: string): Promise<void>;
}
