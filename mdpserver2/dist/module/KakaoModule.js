"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KakaoModule = void 0;
const common_1 = require("@nestjs/common");
const KakaoController_1 = require("../controller/KakaoController");
const KakaoRepository_1 = require("../domain/repository/KakaoRepository");
const KakaoService_1 = require("../service/KakaoService");
const UserModule_1 = require("./UserModule");
let KakaoModule = class KakaoModule {
};
KakaoModule = __decorate([
    (0, common_1.Module)({
        imports: [UserModule_1.UserModule],
        controllers: [KakaoController_1.KakaoController],
        providers: [KakaoRepository_1.KakaoRepository, KakaoService_1.KakaoService]
    })
], KakaoModule);
exports.KakaoModule = KakaoModule;
//# sourceMappingURL=KakaoModule.js.map