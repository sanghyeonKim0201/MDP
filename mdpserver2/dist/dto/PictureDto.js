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
exports.PictureDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const UserEntity_1 = require("../domain/entity/UserEntity");
class PictureDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "sdwadfgavasca",
        description: "사진을 이진으로 변환한 데이터"
    }),
    __metadata("design:type", String)
], PictureDto.prototype, "picture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "1",
        description: "유저 번호"
    }),
    __metadata("design:type", UserEntity_1.User)
], PictureDto.prototype, "userNo", void 0);
exports.PictureDto = PictureDto;
//# sourceMappingURL=PictureDto.js.map