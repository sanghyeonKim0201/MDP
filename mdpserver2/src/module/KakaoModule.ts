import { Module } from "@nestjs/common";
import { KakaoController } from "src/controller/KakaoController";
import { KakaoRepository } from "src/domain/repository/KakaoRepository";
import { KakaoService } from "src/service/KakaoService";
import { UserModule } from "./UserModule";


@Module({
    imports : [UserModule],
    controllers : [KakaoController],
    providers : [KakaoRepository, KakaoService]
})
export class KakaoModule{}