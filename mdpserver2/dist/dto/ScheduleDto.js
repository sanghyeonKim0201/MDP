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
exports.SeatDTO = exports.CreateScheduleDTO = exports.ScheduleDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const UserDto_1 = require("./UserDto");
class ScheduleDTO {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: "스케줄 번호"
    }),
    __metadata("design:type", Number)
], ScheduleDTO.prototype, "scheduleNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "JJA",
        description: "항공사의 아이디"
    }),
    __metadata("design:type", String)
], ScheduleDTO.prototype, "airlineId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "아시아나항공",
        description: "항공사의 이름"
    }),
    __metadata("design:type", String)
], ScheduleDTO.prototype, "airlineName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "PSCRPP",
        description: "도착 공항의 아이디"
    }),
    __metadata("design:type", String)
], ScheduleDTO.prototype, "arrAirportId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "인천",
        description: "도착 공항의 이름"
    }),
    __metadata("design:type", String)
], ScheduleDTO.prototype, "arrAirportName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "2023-04-02 11:00",
        description: "도착 시간"
    }),
    __metadata("design:type", String)
], ScheduleDTO.prototype, "arrPlandTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "PCSRQS",
        description: "출발 공항의 아이디"
    }),
    __metadata("design:type", String)
], ScheduleDTO.prototype, "depAirportId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "제주",
        description: "출발 공항의 이름"
    }),
    __metadata("design:type", String)
], ScheduleDTO.prototype, "depAirportName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "2023-04-02 10:00",
        description: "도착 시간"
    }),
    __metadata("design:type", String)
], ScheduleDTO.prototype, "depPlandTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "JW900",
        description: "항공편명"
    }),
    __metadata("design:type", String)
], ScheduleDTO.prototype, "vihicleId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "A1",
        description: "좌석"
    }),
    __metadata("design:type", String)
], ScheduleDTO.prototype, "seat", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: "예약한 유저"
    }),
    __metadata("design:type", UserDto_1.UserDTO)
], ScheduleDTO.prototype, "userNo", void 0);
exports.ScheduleDTO = ScheduleDTO;
class CreateScheduleDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "JJA",
        description: "항공사의 아이디"
    }),
    __metadata("design:type", String)
], CreateScheduleDTO.prototype, "airlineId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "아시아나항공",
        description: "항공사의 이름"
    }),
    __metadata("design:type", String)
], CreateScheduleDTO.prototype, "airlineName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "PSCRPP",
        description: "도착 공항의 아이디"
    }),
    __metadata("design:type", String)
], CreateScheduleDTO.prototype, "arrAirportId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "인천",
        description: "도착 공항의 이름"
    }),
    __metadata("design:type", String)
], CreateScheduleDTO.prototype, "arrAirportName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "2023-04-02 11:00",
        description: "도착 시간"
    }),
    __metadata("design:type", String)
], CreateScheduleDTO.prototype, "arrPlandTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "PCSRQS",
        description: "출발 공항의 아이디"
    }),
    __metadata("design:type", String)
], CreateScheduleDTO.prototype, "depAirportId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "제주",
        description: "출발 공항의 이름"
    }),
    __metadata("design:type", String)
], CreateScheduleDTO.prototype, "depAirportName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "2023-04-02 10:00",
        description: "도착 시간"
    }),
    __metadata("design:type", String)
], CreateScheduleDTO.prototype, "depPlandTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "JW900",
        description: "항공편명"
    }),
    __metadata("design:type", String)
], CreateScheduleDTO.prototype, "vihicleId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "A1",
        description: "좌석"
    }),
    __metadata("design:type", String)
], CreateScheduleDTO.prototype, "seat", void 0);
exports.CreateScheduleDTO = CreateScheduleDTO;
class SeatDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "A1",
        description: "좌석"
    }),
    __metadata("design:type", String)
], SeatDTO.prototype, "seat", void 0);
exports.SeatDTO = SeatDTO;
//# sourceMappingURL=ScheduleDto.js.map