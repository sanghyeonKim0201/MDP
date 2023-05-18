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
exports.ScheduleRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const ScheduleEntity_1 = require("../entity/ScheduleEntity");
let ScheduleRepository = class ScheduleRepository extends typeorm_1.Repository {
    constructor(dataSoucre) {
        super(ScheduleEntity_1.Schedule, dataSoucre.createEntityManager());
        this.dataSoucre = dataSoucre;
    }
    async findListByUserNo(userNo) {
        const list = await this.createQueryBuilder("schedules").where("schedules.u_no = :userNo", { userNo: Number.parseInt(userNo) }).getMany();
        return list;
    }
    async findByScheduleNo(scheduleNo) {
        const result = await this.createQueryBuilder("schedules")
            .leftJoin("schedules.userNo", "users")
            .where("schedules.s_no = :scheduleNo", { scheduleNo: Number.parseInt(scheduleNo) })
            .getOne();
        return result;
    }
    async findByVihideId(vihicleId) {
        const result = await this.createQueryBuilder("schedules")
            .select("schedules.seat")
            .where("schedules.s_vihicleId = :vihicleId", { vihicleId: vihicleId })
            .getMany();
        return result;
    }
};
ScheduleRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ScheduleRepository);
exports.ScheduleRepository = ScheduleRepository;
//# sourceMappingURL=ScheduleRepository.js.map