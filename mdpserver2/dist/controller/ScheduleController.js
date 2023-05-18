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
exports.ScheduleController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const Decorator_1 = require("../Decorator");
const UserEntity_1 = require("../domain/entity/UserEntity");
const ScheduleDto_1 = require("../dto/ScheduleDto");
const ScheduleService_1 = require("../service/ScheduleService");
const ScheduleResponse_1 = require("../swagger/response/ScheduleResponse");
const UserResponse_1 = require("../swagger/response/UserResponse");
let ScheduleController = class ScheduleController {
    constructor(scheduleService) {
        this.scheduleService = scheduleService;
        this.scheduleService = scheduleService;
    }
    async reservation(createScheduleDTO, user) {
        createScheduleDTO.userNo = user;
        console.log(createScheduleDTO);
        await this.scheduleService.createSchedule(createScheduleDTO);
        throw new common_1.HttpException(Object.assign({
            statusCode: 200,
            message: "에약이 완료되었습니다",
        }), 200);
    }
    async reservationList(userNo) {
        const result = await this.scheduleService.getScheduleList(userNo);
        throw new common_1.HttpException(Object.assign({
            list: result
        }), 200);
    }
    async reservationSeat(vihicleid) {
        const result = await this.scheduleService.getSeat(vihicleid);
        throw new common_1.HttpException(Object.assign({
            list: result
        }), 200);
    }
    async reservationInfo(scheduleNo) {
        const result = await this.scheduleService.getSchedule(scheduleNo);
        throw new common_1.HttpException(Object.assign(Object.assign({}, result)), 200);
    }
    async reservationDelete(scheduleNo) {
        await this.scheduleService.deleteSchedule(scheduleNo);
        throw new common_1.HttpException(Object.assign({
            statusCode: 200,
            message: "삭제가 완료되었습니다",
        }), 200);
    }
};
__decorate([
    (0, common_1.Post)("reservation"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: "reservationAPI",
        description: "예약일정 등록에 대한 API"
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
    __param(1, (0, Decorator_1.GetUesr)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ScheduleDto_1.CreateScheduleDTO, UserEntity_1.User]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "reservation", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: "reservationListAPI",
        description: "모든 예약일정을 불러오는 API"
    }),
    (0, swagger_1.ApiResponse)({
        type: ScheduleResponse_1.reservationListResponseData,
        status: 200,
        description: "success"
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "fail",
        type: UserResponse_1.FailResponseData
    }),
    __param(0, (0, common_1.Query)("userNo")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "reservationList", null);
__decorate([
    (0, common_1.Get)("vihicleid/:vihicleid"),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("vihicleid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "reservationSeat", null);
__decorate([
    (0, common_1.Get)(":scheduleNo"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: "reservationInfoAPI",
        description: "선택한 예약일정의 내용을 불러오는 API"
    }),
    (0, swagger_1.ApiResponse)({
        type: ScheduleDto_1.ScheduleDTO,
        status: 200,
        description: "success"
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "fail",
        type: UserResponse_1.FailResponseData
    }),
    __param(0, (0, common_1.Param)("scheduleNo")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "reservationInfo", null);
__decorate([
    (0, common_1.Delete)(":scheduleNo"),
    (0, swagger_1.ApiBearerAuth)(),
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
    __param(0, (0, common_1.Param)("scheduleNo")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "reservationDelete", null);
ScheduleController = __decorate([
    (0, swagger_1.ApiTags)("schedules"),
    (0, common_1.Controller)("api/schedules"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [ScheduleService_1.ScheduleService])
], ScheduleController);
exports.ScheduleController = ScheduleController;
//# sourceMappingURL=ScheduleController.js.map