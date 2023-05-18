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
exports.Fingers = void 0;
const typeorm_1 = require("typeorm");
const UserEntity_1 = require("./UserEntity");
let Fingers = class Fingers {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "f_no" }),
    __metadata("design:type", Number)
], Fingers.prototype, "fingerNo", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "f_finger" }),
    __metadata("design:type", String)
], Fingers.prototype, "finger", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserEntity_1.User, (user) => user.userNo, { cascade: true, eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "u_no" }),
    __metadata("design:type", UserEntity_1.User)
], Fingers.prototype, "userNo", void 0);
Fingers = __decorate([
    (0, typeorm_1.Entity)("fingers")
], Fingers);
exports.Fingers = Fingers;
//# sourceMappingURL=FingersEntity.js.map