import { ApiProperty } from "@nestjs/swagger";
import { KakaoDTO } from "src/dto/KakaoDto";

export class KakaoListResponseData{
    @ApiProperty({
        isArray : true
    })
    list : KakaoDTO[]
}