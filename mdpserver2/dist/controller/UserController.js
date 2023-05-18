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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const UserDto_1 = require("../dto/UserDto");
const UserService_1 = require("../service/UserService");
const common_2 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const UserResponse_1 = require("../swagger/response/UserResponse");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.userService = userService;
    }
    async login(loginDTO) {
        const result = await this.userService.login(loginDTO.userId, loginDTO.userPw);
        throw new common_1.HttpException(Object.assign(Object.assign({}, result)), 200);
    }
    async join(createUserDTO) {
        const result = await this.userService.createUser(createUserDTO);
        if (result) {
            throw new common_1.HttpException((Object.assign({
                statusCode: 201,
                message: "회원가입에 성공하였습니다"
            })), 201);
        }
    }
    async idCheck(userId) {
        const result = await this.userService.userIdCheck(userId);
        throw new common_1.HttpException(Object.assign({
            statusCode: 200,
            message: "사용가능한 아이디 입니다"
        }), 200);
    }
    async getUserInfo(userNo) {
        const result = await this.userService.getUserInfo(userNo);
        throw new common_1.HttpException(Object.assign(Object.assign({}, result)), 200);
    }
    async updateUser(userNo, updateUserDTO) {
        const result = await this.userService.updateUser(userNo, updateUserDTO);
        throw new common_1.HttpException(Object.assign({
            statusCode: 201,
            message: "유저정보 업데이트가 완료되었습니다",
        }), 201);
    }
    async deleteUser(userNo) {
        const result = await this.userService.deleteUser(userNo);
        throw new common_1.HttpException(Object.assign({
            statusCode: 200,
            message: "유저정보 삭제가 완료되었습니다",
        }), 200);
    }
};
__decorate([
    (0, common_1.Post)("/login"),
    (0, swagger_1.ApiOperation)({
        summary: "loginAPI",
        description: "login을 하는 API"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "success",
        type: UserResponse_1.LoginResponseData
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "fail",
        type: UserResponse_1.FailResponseData
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserDto_1.UserLoginDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("/join"),
    (0, swagger_1.ApiOperation)({
        summary: "creatUserAPI",
        description: "회원가입을 하는 API"
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "success",
        type: UserResponse_1.SuccessResponseData
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "fail",
        type: UserResponse_1.FailResponseData
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserDto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "join", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "idCheckAPI",
        description: "id 중복확인을 하는 API"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "success",
        type: UserResponse_1.SuccessResponseData
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "fail",
        type: UserResponse_1.FailResponseData
    }),
    __param(0, (0, common_1.Query)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "idCheck", null);
__decorate([
    (0, common_1.Get)(":userNo"),
    (0, swagger_1.ApiOperation)({
        summary: "userInfoAPI",
        description: "유저정보를 불러오는 API"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "success",
        type: UserDto_1.UserDTO
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "fail",
        type: UserResponse_1.FailResponseData
    }),
    __param(0, (0, common_1.Param)("userNo")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Put)(":userNo"),
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: "UserUpDateAPI",
        description: "유저정보를 불러오는 API"
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "success",
        type: UserResponse_1.SuccessResponseData
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "fail",
        type: UserResponse_1.FailResponseData
    }),
    __param(0, (0, common_1.Param)("userNo")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UserDto_1.UpdateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(":userNo"),
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: "UserDeleteAPI",
        description: "유저정보를 불러오는 API"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "success",
        type: UserResponse_1.SuccessResponseData
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "fail",
        type: UserResponse_1.FailResponseData
    }),
    __param(0, (0, common_1.Param)("userNo")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)("users"),
    (0, common_1.Controller)('api/users'),
    __metadata("design:paramtypes", [UserService_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map