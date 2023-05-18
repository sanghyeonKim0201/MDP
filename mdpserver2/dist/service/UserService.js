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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const UserRepository_1 = require("../domain/repository/UserRepository");
const jwt_1 = require("@nestjs/jwt");
const AuthRepository_1 = require("../domain/repository/AuthRepository");
let UserService = class UserService {
    constructor(userRepository, jwtService, authRepository) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.authRepository = authRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.authRepository = authRepository;
    }
    async login(userId, userPw) {
        const userFind = await this.authRepository.getAuthenticatedUser(userId, userPw);
        const payLoad = { userNo: userFind.userNo, userId: userFind.userId };
        return Object.assign({
            token: this.jwtService.sign(payLoad),
            user: Object.assign({}, userFind)
        });
    }
    async userIdCheck(userId) {
        const result = await this.userRepository.findByUserId(userId);
        if (result) {
            throw new common_1.HttpException(Object.assign({
                statusCode: 401,
                message: "이미 존재하는 아이디입니다"
            }), 401);
        }
        else if (!result) {
            return null;
        }
    }
    async createUser(createUserDTO) {
        createUserDTO.userPw = await this.authRepository.transfomrPassword(createUserDTO.userPw);
        let result = await this.userIdCheck(createUserDTO.userId);
        if (!result) {
            this.userRepository.save(createUserDTO);
            return createUserDTO;
        }
        else {
            throw new common_1.HttpException(Object.assign({
                statusCode: 400,
                message: "회원가입에 실패하였습니다"
            }), 400);
        }
    }
    async getUserInfo(userNo) {
        let result = await this.userRepository.findByUserNo(userNo);
        if (!result) {
            throw new common_1.HttpException(Object.assign({
                statusCode: 404,
                message: `${userNo}번 회원은 없는 번호입니다`,
            }), 404);
        }
        return result;
    }
    async updateUser(userNo, updateUserDTO) {
        if (!await this.userRepository.findByUserNo(userNo)) {
            throw new common_1.HttpException(Object.assign({
                statusCode: 404,
                message: `${userNo}번 회원은 없는 번호입니다`,
            }), 404);
        }
        let result = await this.userRepository.updateUser(userNo, updateUserDTO);
    }
    async deleteUser(userNo) {
        if (!await this.userRepository.findByUserNo(userNo)) {
            throw new common_1.HttpException(Object.assign({
                statusCode: 404,
                message: `${userNo}번 회원은 없는 번호입니다`,
            }), 404);
        }
        let result = await this.userRepository.deleteUser(userNo);
    }
    async tokenValidUser(payload) {
        return await this.userRepository.findByUserNo(payload.userId);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository, jwt_1.JwtService, AuthRepository_1.AuthRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map