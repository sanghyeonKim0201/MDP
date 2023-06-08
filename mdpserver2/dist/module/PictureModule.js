"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PictureModule = void 0;
const common_1 = require("@nestjs/common");
const PictureController_1 = require("../controller/PictureController");
const PictureRepository_1 = require("../domain/repository/PictureRepository");
const PictureService_1 = require("../service/PictureService");
let PictureModule = class PictureModule {
};
PictureModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [PictureController_1.PictureController],
        providers: [PictureRepository_1.PictureRepository, PictureService_1.PictureService]
    })
], PictureModule);
exports.PictureModule = PictureModule;
//# sourceMappingURL=PictureModule.js.map