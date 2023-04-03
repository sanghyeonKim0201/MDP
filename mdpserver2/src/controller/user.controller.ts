import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res} from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO, UserDTO, UserLoginDTO } from 'src/dto/user.dto';
import { UserService } from 'src/service/user.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FailResponseData, LoginResponseData, SuccessResponseData } from 'src/swagger/response/user.response';

@ApiTags("users")
@Controller('api/users')
export class UserController {

    constructor(private readonly userService: UserService) {
        this.userService = userService
    }

    @Post("/login")
    @ApiOperation({
        summary : "loginAPI",
        description : "login을 하는 API"
    })
    
    @ApiResponse({
        status : 200,
        description : "success",
        type : LoginResponseData
    })
    @ApiResponse({
        status : 400,
        description : "fail",
        type : FailResponseData
    })
    async login(@Body() loginDTO : UserLoginDTO){
        
        const result = await this.userService.login(loginDTO.userId, loginDTO.userPw)
        throw new HttpException(Object.assign({
            ...result
        }), 200)
    }
    @Post("/join")
    @ApiOperation({
        summary : "creatUserAPI",
        description : "회원가입을 하는 API"
    })
    
    @ApiResponse({
        status : 201,
        description : "success",
        type : SuccessResponseData
    })
    @ApiResponse({
        status : 400,
        description : "fail",
        type : FailResponseData
    })
    async join(@Body() createUserDTO: CreateUserDTO) {
        const result = await this.userService.createUser(createUserDTO)
        if (result) {
            throw new HttpException((Object.assign({
                statusCode : 201,
                message : "회원가입에 성공하였습니다"
            })), 201)
        }
    }
    @Get()
    @ApiOperation({
        summary : "idCheckAPI",
        description : "id 중복확인을 하는 API"
    })
    
    @ApiResponse({
        status : 200,
        description : "success",
        type : SuccessResponseData
    })
    @ApiResponse({
        status : 400,
        description : "fail",
        type : FailResponseData
    })
    async idCheck(@Query("userId")userId : String){
        const result = await this.userService.userIdCheck(userId)
        throw new HttpException(Object.assign({
            statusCode : 200,
            message : "사용가능한 아이디 입니다"
        }), 200)
    }

    @Get(":userNo")
    @ApiOperation({
        summary : "userInfoAPI",
        description : "유저정보를 불러오는 API"
    })
    
    @ApiResponse({
        status : 200,
        description : "success",
        type : UserDTO
    })
    @ApiResponse({
        status : 400,
        description : "fail",
        type : FailResponseData
    })
    async getUserInfo(@Param("userNo")userNo : string){
        const result = await this.userService.getUserInfo(userNo)
        throw new HttpException(Object.assign({
            ...result
        }), 200)
    }
    @Put(":userNo")
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({
        summary : "UserUpDateAPI",
        description : "유저정보를 불러오는 API"
    })
    
    @ApiResponse({
        status : 201,
        description : "success",
        type : SuccessResponseData
    })
    @ApiResponse({
        status : 400,
        description : "fail",
        type : FailResponseData
    })
    async updateUser(@Param("userNo")userNo : string, @Body()updateUserDTO : UpdateUserDTO){
        const result = await this.userService.updateUser(userNo, updateUserDTO)
        throw new HttpException(Object.assign({
            statusCode : 201,
            message : "유저정보 업데이트가 완료되었습니다",
        }), 201)
    }
    @Delete(":userNo")
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({
        summary : "UserDeleteAPI",
        description : "유저정보를 불러오는 API"
    })
    
    @ApiResponse({
        status : 200,
        description : "success",
        type : SuccessResponseData
    })
    @ApiResponse({
        status : 400,
        description : "fail",
        type : FailResponseData
    })
    async deleteUser(@Param("userNo")userNo : string){
        const result = await this.userService.deleteUser(userNo)
        throw new HttpException(Object.assign({
            statusCode : 200,
            message : "유저정보 삭제가 완료되었습니다",
        }), 200)
    }
}
