import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO, UserLoginDTO } from 'src/dto/user.dto';
import { UserService } from 'src/service/user.service';

@Controller('api/users')
export class UserController {
    
    constructor(private readonly userService : UserService){
        this.userService = userService
    }

    @Post("/login")
    async login(@Body() loginDTO : UserLoginDTO){
        
        const result = await this.userService.login(loginDTO)
        return result
    }
    @Post("/join")
    async join(@Body() createUserDTO : CreateUserDTO){
        const result = await this.userService.createUser(createUserDTO)
        return Object.assign({
            user : {...createUserDTO},
            statusCode : 200,
            statusMsg : "회원가입이 완료되었습니다"
        })
    }
}
