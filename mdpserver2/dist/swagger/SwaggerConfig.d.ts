import { DocumentBuilder } from "@nestjs/swagger";
export declare class BaseAPIDocumnet {
    builder: DocumentBuilder;
    init(): Omit<import("@nestjs/swagger").OpenAPIObject, "paths">;
}
