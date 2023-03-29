import { PartialType } from "@nestjs/mapped-types"
import { IsString } from "class-validator"

export class UserDTO{
    userNo?: number
    userId?: String
    userPw?: String
    userPhone?: String
    userBirth?: String
    userName1?: String
    userName2?: String
    userFinger?: String
}
export class CreateUserDTO{
    @IsString()
    userId?: String
    @IsString()
    userPw?: String
    @IsString()
    userPhone?: String
    @IsString()
    userBirth?: String
    @IsString()
    userName1?: String
    @IsString()
    userName2?: String
}
export class UpdateUserDTO extends PartialType(CreateUserDTO){
    
}
export class UserLoginDTO{
    userId : String
    userPw : String
}