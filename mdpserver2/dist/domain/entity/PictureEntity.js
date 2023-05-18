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
exports.Picture = void 0;
const typeorm_1 = require("typeorm");
const UserEntity_1 = require("./UserEntity");
let Picture = class Picture {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "p_no" }),
    __metadata("design:type", Number)
], Picture.prototype, "pictureNo", void 0);
__decorate([
    (0, typeorm_1.Column)("longblob", { name: "p_picture" }),
    __metadata("design:type", Array)
], Picture.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserEntity_1.User, (user) => user.userNo, { cascade: true, eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "u_no" }),
    __metadata("design:type", UserEntity_1.User)
], Picture.prototype, "userNo", void 0);
Picture = __decorate([
    (0, typeorm_1.Entity)("pictures")
], Picture);
exports.Picture = Picture;
//# sourceMappingURL=PictureEntity.js.map