"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretKey = exports.ormConfig = void 0;
const FingersEntity_1 = require("./domain/entity/FingersEntity");
const KakaoEntity_1 = require("./domain/entity/KakaoEntity");
const PictureEntity_1 = require("./domain/entity/PictureEntity");
const ScheduleEntity_1 = require("./domain/entity/ScheduleEntity");
const UserEntity_1 = require("./domain/entity/UserEntity");
exports.ormConfig = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "mdp",
    entities: [UserEntity_1.User, PictureEntity_1.Picture, ScheduleEntity_1.Schedule, FingersEntity_1.Fingers, KakaoEntity_1.Kakao],
    synchronize: true,
    logging: true
};
exports.secretKey = "ASDWSADczxc123asd";
//# sourceMappingURL=ormConfig.js.map