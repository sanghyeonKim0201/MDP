import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDTO, UserDTO } from "src/dto/user.dto";

export class LoginResponseData{
    @ApiProperty()
    user: UserDTO
    @ApiProperty({
        example : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTm8iOjEsInVzZXJJZCI6InJsc21kMSIsImlhdCI6MTY4MDQxMzU4MiwiZXhwIjoxNjgwNDE2NTgyfQ.NPPHuCZAzcYV0VSUyRVd4cdLZa12wAGuHCuVzowQjg0"
    })
    token : string
}

export class FailResponseData{
    @ApiProperty({
        example : 400
    })
    statusCode : number
    @ApiProperty({
        example : "실패하였습니다"
    })
    message : string
}
export class SuccessResponseData{
    @ApiProperty({
        example : 200
    })
    statusCode : number
    @ApiProperty({
        example : "성공하였습니다"
    })
    message : string
}