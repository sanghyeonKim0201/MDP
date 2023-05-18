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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KakaoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const KakaoDto_1 = require("../dto/KakaoDto");
const KakaoService_1 = require("../service/KakaoService");
const KakaoResponse_1 = require("../swagger/response/KakaoResponse");
const UserResponse_1 = require("../swagger/response/UserResponse");
let KakaoController = class KakaoController {
    constructor(kakaoService) {
        this.kakaoService = kakaoService;
        this.kakaoService = kakaoService;
    }
    async reservation(createKakaoScheduleDTO) {
        await this.kakaoService.createKakaoSchedule(createKakaoScheduleDTO);
        throw new common_1.HttpException(Object.assign({
            statusCode: 200,
            message: "에약이 완료되었습니다",
        }), 200);
    }
    async reservationList(kakaoEmail) {
        const result = await this.kakaoService.getKakaoScheduleList(kakaoEmail);
        throw new common_1.HttpException(Object.assign({
            list: result
        }), 200);
    }
    async reservationInfo(kakaoscheduleNo) {
        const result = await this.kakaoService.getKakaoSchedule(kakaoscheduleNo);
        throw new common_1.HttpException(Object.assign(Object.assign({}, result)), 200);
    }
    async reservationDelete(kakaoscheduleNo) {
        await this.kakaoService.deleteKakaoSchedule(kakaoscheduleNo);
        throw new common_1.HttpException(Object.assign({
            statusCode: 200,
            message: "삭제가 완료되었습니다",
        }), 200);
    }
};
__decorate([
    (0, common_1.Post)("reservation"),
    (0, swagger_1.ApiOperation)({
        summary: "kakaoreservationAPI",
        description: "카카오 예약일정 등록에 대한 API"
    }),
    (0, swagger_1.ApiResponse)({
        type: UserResponse_1.SuccessResponseData,
        status: 200,
        description: "success"
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "fail",
        type: UserResponse_1.FailResponseData
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KakaoDto_1.CreateKakaoScheduleDTO]),
    __metadata("design:returntype", Promise)
], KakaoController.prototype, "reservation", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "kakaoreservationListAPI",
        description: "카카오 모든 예약일정을 불러오는 API"
    }),
    (0, swagger_1.ApiResponse)({
        type: KakaoResponse_1.KakaoListResponseData,
        status: 200,
        description: "success"
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "fail",
        type: UserResponse_1.FailResponseData
    }),
    __param(0, (0, common_1.Query)("kakaoemail")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KakaoController.prototype, "reservationList", null);
__decorate([
    (0, common_1.Get)(":kakaoscheduleno"),
    (0, swagger_1.ApiOperation)({
        summary: "reservationInfoAPI",
        description: "선택한 예약일정의 내용을 불러오는 API"
    }),
    (0, swagger_1.ApiResponse)({
        type: KakaoDto_1.KakaoDTO,
        status: 200,
        description: "success"
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "fail",
        type: UserResponse_1.FailResponseData
    }),
    __param(0, (0, common_1.Param)("kakaoscheduleno")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KakaoController.prototype, "reservationInfo", null);
__decorate([
    (0, common_1.Delete)(":kakaoscheduleno"),
    (0, swagger_1.ApiOperation)({
        summary: "reservationDeleteAPI",
        description: "예약일정을 삭제하는 API"
    }),
    (0, swagger_1.ApiResponse)({
        type: UserResponse_1.SuccessResponseData,
        status: 200,
        description: "success"
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "fail",
        type: UserResponse_1.FailResponseData
    }),
    __param(0, (0, common_1.Param)("kakaoscheduleno")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KakaoController.prototype, "reservationDelete", null);
KakaoController = __decorate([
    (0, common_1.Controller)("api/kakao"),
    __metadata("design:paramtypes", [KakaoService_1.KakaoService])
], KakaoController);
exports.KakaoController = KakaoController;
//# sourceMappingURL=KakaoController.js.map