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
exports.CreateKakaoScheduleDTO = exports.KakaoDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class KakaoDTO {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: "스케줄 번호"
    }),
    __metadata("design:type", String)
], KakaoDTO.prototype, "kakaoScheduleNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "JJA",
        description: "항공사의 아이디"
    }),
    __metadata("design:type", String)
], KakaoDTO.prototype, "airlineId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "아시아나항공",
        description: "항공사의 이름"
    }),
    __metadata("design:type", String)
], KakaoDTO.prototype, "airlineName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "PSCRPP",
        description: "도착 공항의 아이디"
    }),
    __metadata("design:type", String)
], KakaoDTO.prototype, "arrAirportId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "인천",
        description: "도착 공항의 이름"
    }),
    __metadata("design:type", String)
], KakaoDTO.prototype, "arrAirportName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "2023-04-02 11:00",
        description: "도착 시간"
    }),
    __metadata("design:type", String)
], KakaoDTO.prototype, "arrPlandTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "PCSRQS",
        description: "출발 공항의 아이디"
    }),
    __metadata("design:type", String)
], KakaoDTO.prototype, "depAirportId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "제주",
        description: "출발 공항의 이름"
    }),
    __metadata("design:type", String)
], KakaoDTO.prototype, "depAirportName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "2023-04-02 10:00",
        description: "도착 시간"
    }),
    __metadata("design:type", String)
], KakaoDTO.prototype, "depPlandTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "JW900",
        description: "항공편명"
    }),
    __metadata("design:type", String)
], KakaoDTO.prototype, "vihicleId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "gmhty4345@gmail.com",
        description: "카카오계정"
    }),
    __metadata("design:type", String)
], KakaoDTO.prototype, "kakaoEmail", void 0);
exports.KakaoDTO = KakaoDTO;
class CreateKakaoScheduleDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "JJA",
        description: "항공사의 아이디"
    }),
    __metadata("design:type", String)
], CreateKakaoScheduleDTO.prototype, "airlineId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "아시아나항공",
        description: "항공사의 이름"
    }),
    __metadata("design:type", String)
], CreateKakaoScheduleDTO.prototype, "airlineName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "PSCRPP",
        description: "도착 공항의 아이디"
    }),
    __metadata("design:type", String)
], CreateKakaoScheduleDTO.prototype, "arrAirportId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "인천",
        description: "도착 공항의 이름"
    }),
    __metadata("design:type", String)
], CreateKakaoScheduleDTO.prototype, "arrAirportName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "2023-04-02 11:00",
        description: "도착 시간"
    }),
    __metadata("design:type", String)
], CreateKakaoScheduleDTO.prototype, "arrPlandTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "PCSRQS",
        description: "출발 공항의 아이디"
    }),
    __metadata("design:type", String)
], CreateKakaoScheduleDTO.prototype, "depAirportId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "제주",
        description: "출발 공항의 이름"
    }),
    __metadata("design:type", String)
], CreateKakaoScheduleDTO.prototype, "depAirportName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "2023-04-02 10:00",
        description: "도착 시간"
    }),
    __metadata("design:type", String)
], CreateKakaoScheduleDTO.prototype, "depPlandTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "JW900",
        description: "항공편명"
    }),
    __metadata("design:type", String)
], CreateKakaoScheduleDTO.prototype, "vihicleId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "gmhty4345@gmail.com",
        description: "카카오계정"
    }),
    __metadata("design:type", String)
], CreateKakaoScheduleDTO.prototype, "kakaoEmail", void 0);
exports.CreateKakaoScheduleDTO = CreateKakaoScheduleDTO;
//# sourceMappingURL=KakaoDto.js.map