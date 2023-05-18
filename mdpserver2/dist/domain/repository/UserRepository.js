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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const UserEntity_1 = require("../entity/UserEntity");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(UserEntity_1.User, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async findByUserId(userId) {
        return await this.createQueryBuilder("users").where("users.u_id = :id", { id: userId }).getOne();
    }
    async findByUserNo(userNo) {
        return await this.createQueryBuilder("users").where("users.u_no = :no", { no: Number.parseInt(userNo) }).getOne();
    }
    async updateUser(userNo, updateUserDTO) {
        const { userId: userId, userPw: userPw, userPhone: userPhone, userBirth: userBirth, userName1: userName1, userName2: userName2 } = updateUserDTO;
        console.log(userId, userPw, userPhone, userBirth, userName1, userName2);
        await this.createQueryBuilder("users").update(UserEntity_1.User).set({
            userId: userId,
            userPw: userPw,
            userPhone: userPhone,
            userBirth: userBirth,
            userName1: userName1,
            userName2: userName2
        }).where("users.u_no = :userNo", { userNo: userNo }).execute();
    }
    async deleteUser(userNo) {
        await this.createQueryBuilder("users").delete().from(UserEntity_1.User).where("users.u_no = :userNo", {
            userNo: Number.parseInt(userNo)
        }).execute();
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map