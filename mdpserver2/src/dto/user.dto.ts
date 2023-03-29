import { PartialType } from "@nestjs/mapped-types"
import { IsString } from "class-validator"

export class UserDTO{
    userNo?: number
    userId?: string
    userPw?: string
    userPhone?: string
    userBirth?: string
    userName1?: string
    userName2?: string
}
export class CreateUserDTO{
    @IsString()
    userId?: string
    @IsString()
    userPw?: string
    @IsString()
    userPhone?: string
    @IsString()
    userBirth?: string
    @IsString()
    userName1?: string
    @IsString()
    userName2?: string
}
export class UpdateUserDTO extends PartialType(CreateUserDTO){
    
}
export class UserLoginDTO{
    userId : string
    userPw : string
}
export class UserIdCheckDTO{
    userId : string
}