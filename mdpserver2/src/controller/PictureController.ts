import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PictureDto } from "src/dto/PictureDto";

@ApiTags("pictures")
@Controller("api/picture")
export class PictureController{
    @Post()
    async post(@Body()picture : PictureDto){
        
    }
}