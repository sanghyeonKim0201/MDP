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
exports.UserIdCheckDTO = exports.UserLoginDTO = exports.UpdateUserDTO = exports.CreateUserDTO = exports.UserDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserDTO {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: "유저 번호"
    }),
    __metadata("design:type", Number)
], UserDTO.prototype, "userNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "user01",
        description: "유저가 사용하는 아이디"
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "user01!",
        description: "유저가 사용하는 비밀번호"
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "userPw", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "010-0010-1000",
        description: "유저가 사용하는 핸드폰 번호(형식 : 010-0000-0000)"
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "userPhone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "2005-02-01",
        description: "유저의 생년월일 ex) 2005-02-01"
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "userBirth", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "김상현",
        description: "유저의 한글 이름"
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "userName1", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "SangHyeonKim",
        description: "유저의 영문 이름"
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "userName2", void 0);
exports.UserDTO = UserDTO;
class CreateUserDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "user01",
        description: "유저가 사용하는 아이디"
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "user01!",
        description: "유저가 사용하는 비밀번호"
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "userPw", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "010-0010-1000",
        description: "유저가 사용하는 핸드폰 번호(형식 : 010-0000-0000)"
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "userPhone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "2005-02-01",
        description: "유저의 생년월일 ex) 2005-02-01"
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "userBirth", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "김상현",
        description: "유저의 한글 이름"
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "userName1", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "SangHyeonKim",
        description: "유저의 영문 이름"
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "userName2", void 0);
exports.CreateUserDTO = CreateUserDTO;
class UpdateUserDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "user01",
        description: "유저가 사용하는 아이디"
    }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "user01!",
        description: "유저가 사용하는 비밀번호"
    }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "userPw", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "010-0010-1000",
        description: "유저가 사용하는 핸드폰 번호(형식 : 010-0000-0000)"
    }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "userPhone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "2005-02-01",
        description: "유저의 생년월일 ex) 2005-02-01"
    }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "userBirth", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "김상현",
        description: "유저의 한글 이름"
    }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "userName1", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "SangHyeonKim",
        description: "유저의 영문 이름"
    }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "userName2", void 0);
exports.UpdateUserDTO = UpdateUserDTO;
class UserLoginDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "user01",
        description: "유저가 사용하는 아이디"
    }),
    __metadata("design:type", String)
], UserLoginDTO.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: "user01!",
        description: "유저가 사용하는 비밀번호"
    }),
    __metadata("design:type", String)
], UserLoginDTO.prototype, "userPw", void 0);
exports.UserLoginDTO = UserLoginDTO;
class UserIdCheckDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "user01",
        description: "유저가 사용할 아이디"
    }),
    __metadata("design:type", String)
], UserIdCheckDTO.prototype, "userId", void 0);
exports.UserIdCheckDTO = UserIdCheckDTO;
//# sourceMappingURL=UserDto.js.map