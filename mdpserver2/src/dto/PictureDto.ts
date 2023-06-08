import { ApiProperty } from "@nestjs/swagger"
import { User } from "src/domain/entity/UserEntity"

export class PictureDto{
    @ApiProperty({
        example : "sdwadfgavasca",
        description : "사진을 이진으로 변환한 데이터"
    })
    picture : string
    @ApiProperty({
        example : "1",
        description : "유저 번호"
    })
    userNo : User
}