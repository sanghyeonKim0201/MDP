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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const UserRepository_1 = require("../domain/repository/UserRepository");
const ormConfig_1 = require("../ormConfig");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(userRepository) {
        super({
            secretOrKey: ormConfig_1.secretKey,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()
        });
        this.userRepository = userRepository;
    }
    async validate(payload) {
        const { userId } = payload;
        const user = await this.userRepository.findByUserId(userId);
        if (!user) {
            throw new common_1.HttpException(Object.assign({
                statusCode: 401,
                message: "인증을 하여 주십시오"
            }), 401);
        }
        return user;
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=JwtStrategy.js.map