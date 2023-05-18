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
exports.SuccessResponseData = exports.FailResponseData = exports.LoginResponseData = void 0;
const swagger_1 = require("@nestjs/swagger");
const UserDto_1 = require("../../dto/UserDto");
class LoginResponseData {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", UserDto_1.UserDTO)
], LoginResponseData.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTm8iOjEsInVzZXJJZCI6InJsc21kMSIsImlhdCI6MTY4MDQxMzU4MiwiZXhwIjoxNjgwNDE2NTgyfQ.NPPHuCZAzcYV0VSUyRVd4cdLZa12wAGuHCuVzowQjg0"
    }),
    __metadata("design:type", String)
], LoginResponseData.prototype, "token", void 0);
exports.LoginResponseData = LoginResponseData;
class FailResponseData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 400
    }),
    __metadata("design:type", Number)
], FailResponseData.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "실패하였습니다"
    }),
    __metadata("design:type", String)
], FailResponseData.prototype, "message", void 0);
exports.FailResponseData = FailResponseData;
class SuccessResponseData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 200
    }),
    __metadata("design:type", Number)
], SuccessResponseData.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "성공하였습니다"
    }),
    __metadata("design:type", String)
], SuccessResponseData.prototype, "message", void 0);
exports.SuccessResponseData = SuccessResponseData;
//# sourceMappingURL=UserResponse.js.map