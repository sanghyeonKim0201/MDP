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
exports.ScheduleService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const ScheduleRepository_1 = require("../domain/repository/ScheduleRepository");
let ScheduleService = class ScheduleService {
    constructor(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
        this.scheduleRepository = scheduleRepository;
    }
    async getScheduleList(userNo) {
        const result = await this.scheduleRepository.findListByUserNo(userNo);
        if (result.length <= 0) {
            throw new common_1.HttpException(Object.assign({
                statusCode: 404,
                message: "예약일정이 없습니다",
            }), 404);
        }
        return result;
    }
    async createSchedule(createScheduleDTO) {
        await this.scheduleRepository.save(createScheduleDTO);
        return Promise.resolve();
    }
    async deleteSchedule(scheduleNo) {
        const find = await this.scheduleRepository.findByScheduleNo(scheduleNo);
        if (!find) {
            throw new common_1.HttpException(Object.assign({
                statusCode: 404,
                message: "스케줄에 대한 정보가 없습니다",
            }), 404);
        }
        await this.scheduleRepository.delete(scheduleNo);
        return Promise.resolve();
    }
    async getSchedule(schedule) {
        const find = await this.scheduleRepository.findByScheduleNo(schedule);
        if (!find) {
            throw new common_1.HttpException(Object.assign({
                statusCode: 404,
                message: "스케줄에 대한 정보가 없습니다",
            }), 404);
        }
        return find;
    }
    async getSeat(vihicleId) {
        const result = await this.scheduleRepository.findByVihideId(vihicleId);
        if (!rxjs_1.find) {
            throw new common_1.HttpException(Object.assign({
                statusCode: 404,
                message: "스케줄에 대한 정보가 없습니다"
            }), 404);
        }
        return result;
    }
};
ScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ScheduleRepository_1.ScheduleRepository])
], ScheduleService);
exports.ScheduleService = ScheduleService;
//# sourceMappingURL=ScheduleService.js.map