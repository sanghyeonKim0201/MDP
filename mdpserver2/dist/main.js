"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const SwaggerConfig_1 = require("./swagger/SwaggerConfig");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new SwaggerConfig_1.BaseAPIDocumnet().init();
    const documnet = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, documnet);
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map