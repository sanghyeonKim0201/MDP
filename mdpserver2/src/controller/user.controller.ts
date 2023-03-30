import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDTO, UpdateUserDTO, UserLoginDTO } from 'src/dto/user.dto';
import { UserService } from 'src/service/user.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
export class UserController {

    constructor(private readonly userService: UserService) {
        this.userService = userService
    }

    @Post("/login")
    async login(@Body() loginDTO : UserLoginDTO, @Res() res : Response){
        const result = await this.userService.login(loginDTO.userId, loginDTO.userPw)
        res.setHeader("Authorization", result.token)
        res.status(200).json(Object.assign({
            statusCode : 200,
            message : "로그인 성공",
            ...result
        }))
    }
    @Post("/join")
    async join(@Body() createUserDTO: CreateUserDTO) {
        const result = await this.userService.createUser(createUserDTO)
        if (result) {
            throw new HttpException((Object.assign({
                statusCode: 200,
                message: "회원가입이 완료되었습니다", 
                user: {
                    ...result
                }
            })), 200)
        }
    }
    @Get()
    async idCheck(@Query("userId")userId : String){
        const result = await this.userService.userIdCheck(userId)
        throw new HttpException(Object.assign({
            statusCode : 200,
            message : "사용가능한 아이디 입니다"
        }), 200)
    }

    @Get(":userNo")
    @UseGuards(AuthGuard())
    async getUserInfo(@Param("userNo")userNo : string){
        const result = await this.userService.getUserInfo(userNo)
        throw new HttpException(Object.assign({
            statusCode : 200,
            message : "유저정보를 불러오는데 성공하였습니다",
            user:{
                ...result
            }
        }), 200)
    }
    @Put(":userNo")
    @UseGuards(AuthGuard('jwt'))
    async updateUser(@Param("userNo")userNo : string, @Body()updateUserDTO : UpdateUserDTO){
        const result = await this.userService.updateUser(userNo, updateUserDTO)
        throw new HttpException(Object.assign({
            statusCode : 200,
            message : "유저정보 업데이트가 완료되었습니다",
            result
        }), 200)
    }
    @Delete(":userNo")
    @UseGuards(AuthGuard('jwt'))
    async deleteUser(@Param("userNo")userNo : string){
        const result = await this.userService.deleteUser(userNo)
        throw new HttpException(Object.assign({
            statusCode : 200,
            message : "유저정보 삭제가 완료되었습니다",
            result
        }), 200)
    }
}
