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
exports.Kakao = void 0;
const typeorm_1 = require("typeorm");
let Kakao = class Kakao {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "kakao_scheduleNo" }),
    __metadata("design:type", String)
], Kakao.prototype, "kakaoScheduleNo", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "kakao_airlineId" }),
    __metadata("design:type", String)
], Kakao.prototype, "airlineId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "kakao_airlineName" }),
    __metadata("design:type", String)
], Kakao.prototype, "airlineName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "kakao_arrAirportId" }),
    __metadata("design:type", String)
], Kakao.prototype, "arrAirportId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "kakao_arrAirportName" }),
    __metadata("design:type", String)
], Kakao.prototype, "arrAirportName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "kakao_arrPlandTime" }),
    __metadata("design:type", String)
], Kakao.prototype, "arrPlandTime", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "kakao_depAirportId" }),
    __metadata("design:type", String)
], Kakao.prototype, "depAirportId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "kakao_depAirportName" }),
    __metadata("design:type", String)
], Kakao.prototype, "depAirportName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "kakao_depPlandTime" }),
    __metadata("design:type", String)
], Kakao.prototype, "depPlandTime", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "kakao_vihicleId" }),
    __metadata("design:type", String)
], Kakao.prototype, "vihicleId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "kakao_email" }),
    __metadata("design:type", String)
], Kakao.prototype, "kakaoEmail", void 0);
Kakao = __decorate([
    (0, typeorm_1.Entity)("kakaos")
], Kakao);
exports.Kakao = Kakao;
//# sourceMappingURL=KakaoEntity.js.map