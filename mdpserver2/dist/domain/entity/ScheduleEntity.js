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
exports.Schedule = void 0;
const typeorm_1 = require("typeorm");
const UserEntity_1 = require("./UserEntity");
let Schedule = class Schedule {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "s_no" }),
    __metadata("design:type", Number)
], Schedule.prototype, "scheduleNo", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "s_airlineId" }),
    __metadata("design:type", String)
], Schedule.prototype, "airlineId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "s_airlineName" }),
    __metadata("design:type", String)
], Schedule.prototype, "airlineName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "s_arrAirportId" }),
    __metadata("design:type", String)
], Schedule.prototype, "arrAirportId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "s_arrAirportName" }),
    __metadata("design:type", String)
], Schedule.prototype, "arrAirportName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "s_arrPlandTime" }),
    __metadata("design:type", String)
], Schedule.prototype, "arrPlandTime", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "s_depAirportId" }),
    __metadata("design:type", String)
], Schedule.prototype, "depAirportId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "s_depAirportName" }),
    __metadata("design:type", String)
], Schedule.prototype, "depAirportName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "s_depPlandTime" }),
    __metadata("design:type", String)
], Schedule.prototype, "depPlandTime", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "s_vihicleId" }),
    __metadata("design:type", String)
], Schedule.prototype, "vihicleId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "s_seat" }),
    __metadata("design:type", String)
], Schedule.prototype, "seat", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserEntity_1.User, (user) => user.userNo, {
        eager: true,
        cascade: true,
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: "u_no", referencedColumnName: "userNo" }),
    __metadata("design:type", UserEntity_1.User)
], Schedule.prototype, "userNo", void 0);
Schedule = __decorate([
    (0, typeorm_1.Entity)("schedules")
], Schedule);
exports.Schedule = Schedule;
//# sourceMappingURL=ScheduleEntity.js.map