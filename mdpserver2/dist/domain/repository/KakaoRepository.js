"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KakaoRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const KakaoEntity_1 = require("../entity/KakaoEntity");
let KakaoRepository = class KakaoRepository extends typeorm_1.Repository {
    constructor(dataSoucre) {
        super(KakaoEntity_1.Kakao, dataSoucre.createEntityManager());
        this.dataSoucre = dataSoucre;
    }
    async findListByKakaoEmail(kakaoEmail) {
        const list = await this.createQueryBuilder("Kakaos").where("Kakaos.kakao_email = :kakaoEmail", { kakaoEmail: kakaoEmail }).getMany();
        return list;
    }
    async findByKakaoScheduleNo(kakaoScheduleNo) {
        const result = await this.createQueryBuilder("Kakaos")
            .where("Kakaos.kakao_scheduleNo = :kakaoScheduleNo", { kakaoScheduleNo: Number.parseInt(kakaoScheduleNo) })
            .getOne();
        return result;
    }
};
KakaoRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], KakaoRepository);
exports.KakaoRepository = KakaoRepository;
//# sourceMappingURL=KakaoRepository.js.map