"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUesr = void 0;
const common_1 = require("@nestjs/common");
exports.GetUesr = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});
//# sourceMappingURL=Decorator.js.map