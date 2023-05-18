"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const UserController_1 = require("../controller/UserController");
const UserEntity_1 = require("../domain/entity/UserEntity");
const AuthRepository_1 = require("../domain/repository/AuthRepository");
const UserRepository_1 = require("../domain/repository/UserRepository");
const ormConfig_1 = require("../ormConfig");
const JwtStrategy_1 = require("../security/JwtStrategy");
const UserService_1 = require("../service/UserService");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([UserEntity_1.User]), jwt_1.JwtModule.register({
                secret: ormConfig_1.secretKey,
                signOptions: { expiresIn: "3000s" }
            }), passport_1.PassportModule.register({ defaultStrategy: "jwt" })],
        controllers: [UserController_1.UserController],
        providers: [UserService_1.UserService, UserRepository_1.UserRepository, AuthRepository_1.AuthRepository, JwtStrategy_1.JwtStrategy],
        exports: [JwtStrategy_1.JwtStrategy, passport_1.PassportModule]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=UserModule.js.map