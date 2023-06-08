
import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"
import { User } from "src/domain/entity/UserEntity"

export class UserDTO{
    @IsNumber()
    @ApiProperty({
        example : 1,
        description : "유저 번호"
    })
    userNo?: number
    @IsString()
    @ApiProperty({
        example : "user01",
        description : "유저가 사용하는 아이디"
    })
    userId?: string
    @IsString()
    @ApiProperty({
        example : "user01!",
        description : "유저가 사용하는 비밀번호"
    })
    userPw?: string
    @IsString()
    @ApiProperty({
        example : "010-0010-1000",
        description : "유저가 사용하는 핸드폰 번호(형식 : 010-0000-0000)"
    })
    userPhone?: string
    @IsString()
    @ApiProperty({
        example : "2005-02-01",
        description : "유저의 생년월일 ex) 2005-02-01"
    })
    userBirth?: string
    @IsString()
    @ApiProperty({
        example : "김상현",
        description : "유저의 한글 이름"
    })
    userName1?: string
    @IsString()
    @ApiProperty({
        example : "SangHyeonKim",
        description : "유저의 영문 이름"
    })
    userName2?: string
    
}
export class CreateUserDTO{
    @IsString()
    @ApiProperty({
        example : "user01",
        description : "유저가 사용하는 아이디"
    })
    userId?: string
    @IsString()
    @ApiProperty({
        example : "user01!",
        description : "유저가 사용하는 비밀번호"
    })
    userPw?: string
    @IsString()
    @ApiProperty({
        example : "010-0010-1000",
        description : "유저가 사용하는 핸드폰 번호(형식 : 010-0000-0000)"
    })
    userPhone?: string
    @IsString()
    @ApiProperty({
        example : "2005-02-01",
        description : "유저의 생년월일 ex) 2005-02-01"
    })
    userBirth?: string
    @IsString()
    @ApiProperty({
        example : "김상현",
        description : "유저의 한글 이름"
    })
    userName1?: string
    @IsString()
    @ApiProperty({
        example : "SangHyeonKim",
        description : "유저의 영문 이름"
    })
    userName2?: string
}
export class UpdateUserDTO{
    @IsString()
    @ApiProperty({
        example : "user01",
        description : "유저가 사용하는 아이디"
    })
    userId?: string
    @IsString()
    @ApiProperty({
        example : "user01!",
        description : "유저가 사용하는 비밀번호"
    })
    userPw?: string
    @IsString()
    @ApiProperty({
        example : "010-0010-1000",
        description : "유저가 사용하는 핸드폰 번호(형식 : 010-0000-0000)"
    })
    userPhone?: string
    @IsString()
    @ApiProperty({
        example : "2005-02-01",
        description : "유저의 생년월일 ex) 2005-02-01"
    })
    userBirth?: string
    @IsString()
    @ApiProperty({
        example : "김상현",
        description : "유저의 한글 이름"
    })
    userName1?: string
    @IsString()
    @ApiProperty({
        example : "SangHyeonKim",
        description : "유저의 영문 이름"
    })
    userName2?: string
}
export class UserLoginDTO{
    @IsString()
    @ApiProperty({
        example : "user01",
        description : "유저가 사용하는 아이디"
    })
    userId : string
    @IsString()
    @ApiProperty({
        example : "user01!",
        description : "유저가 사용하는 비밀번호"
    })
    userPw : string
}
export class UserIdCheckDTO{
    @ApiProperty({
        example : "user01",
        description : "유저가 사용할 아이디"
    })
    userId : string
}