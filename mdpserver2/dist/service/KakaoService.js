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
exports.KakaoService = void 0;
const common_1 = require("@nestjs/common");
const KakaoRepository_1 = require("../domain/repository/KakaoRepository");
let KakaoService = class KakaoService {
    constructor(kakaoRepository) {
        this.kakaoRepository = kakaoRepository;
        this.kakaoRepository = kakaoRepository;
    }
    async getKakaoScheduleList(kakaoEmail) {
        const result = await this.kakaoRepository.findListByKakaoEmail(kakaoEmail);
        if (result.length <= 0) {
            throw new common_1.HttpException(Object.assign({
                statusCode: 404,
                message: "예약일정이 없습니다",
            }), 404);
        }
        return result;
    }
    async createKakaoSchedule(createScheduleKakaoDTO) {
        await this.kakaoRepository.save(createScheduleKakaoDTO);
        return Promise.resolve();
    }
    async deleteKakaoSchedule(kakaoScheduleNo) {
        const find = await this.kakaoRepository.findByKakaoScheduleNo(kakaoScheduleNo);
        if (!find) {
            throw new common_1.HttpException(Object.assign({
                statusCode: 404,
                message: "스케줄에 대한 정보가 없습니다",
            }), 404);
        }
        await this.kakaoRepository.delete(kakaoScheduleNo);
        return Promise.resolve();
    }
    async getKakaoSchedule(kakaoSchedule) {
        const find = await this.kakaoRepository.findByKakaoScheduleNo(kakaoSchedule);
        if (!find) {
            throw new common_1.HttpException(Object.assign({
                statusCode: 404,
                message: "스케줄에 대한 정보가 없습니다",
            }), 404);
        }
        return find;
    }
};
KakaoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [KakaoRepository_1.KakaoRepository])
], KakaoService);
exports.KakaoService = KakaoService;
//# sourceMappingURL=KakaoService.js.map