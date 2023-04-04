import { DocumentBuilder } from "@nestjs/swagger";


export class BaseAPIDocumnet{
    public builder = new DocumentBuilder()

    public init(){
        return this.builder.setTitle("MDPServer NestJS")
        .setDescription("MDP SERVER를 NestJS로 만든 API자동화 문서이다")
        .setVersion("1.0.0")
        .addBearerAuth({
            type : "http",
            scheme  :"bearer",
            bearerFormat : "JWT",
            name : "JWT",
            description : "Enter JWT Token",
            in : "header"
        }, "Token")
        .build()
    }
}