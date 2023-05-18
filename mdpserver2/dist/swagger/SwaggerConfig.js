"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAPIDocumnet = void 0;
const swagger_1 = require("@nestjs/swagger");
class BaseAPIDocumnet {
    constructor() {
        this.builder = new swagger_1.DocumentBuilder();
    }
    init() {
        return this.builder.setTitle("MDPServer NestJS")
            .setDescription("MDP SERVER를 NestJS로 만든 API자동화 문서이다")
            .setVersion("1.0.0")
            .addBearerAuth({
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            name: "JWT",
            description: "Enter JWT Token",
            in: "header"
        }, "Token")
            .build();
    }
}
exports.BaseAPIDocumnet = BaseAPIDocumnet;
//# sourceMappingURL=SwaggerConfig.js.map