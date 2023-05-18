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
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const UserRepository_1 = require("./UserRepository");
let AuthRepository = class AuthRepository {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.userRepository = userRepository;
    }
    async transfomrPassword(str) {
        return await bcrypt.hash(str, 10);
    }
    async getAuthenticatedUser(userId, userPw) {
        try {
            const user = await this.userRepository.findByUserId(userId);
            if (!user) {
                throw new common_1.HttpException("잘못된 인증 정보입니다", 400);
            }
            await this.verifyPassword(userPw, user.userPw);
            return user;
        }
        catch (error) {
            throw new common_1.HttpException("잘못된 인증 정보입니다", 400);
        }
    }
    async verifyPassword(userPw, hashUserPw) {
        const isPasswordMatching = await bcrypt.compare(userPw, hashUserPw);
        if (!isPasswordMatching) {
            throw new common_1.HttpException("잘못된 인증 정보입니다", 400);
        }
        return Promise.resolve();
    }
};
AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository])
], AuthRepository);
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=AuthRepository.js.map