import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/domain/repository/user.repository';
import { CreateUserDTO, UpdateUserDTO, UserDTO, UserIdCheckDTO, UserLoginDTO } from 'src/dto/user.dto';
import * as bcrypt from "bcrypt"
import { PayLoad } from 'src/security/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/entity/user.entity';
import { AuthRepository } from 'src/domain/repository/auth.repository';

@Injectable()
export class UserService {
    constructor(private userRepository : UserRepository, private jwtService : JwtService, private authRepository : AuthRepository){
        this.userRepository = userRepository
        this.jwtService = jwtService
        this.authRepository = authRepository
    }
    
    async login(userId : string, userPw : string) : Promise<{token : string, } | undefined>{
        const userFind = await this.authRepository.getAuthenticatedUser(userId, userPw)
        const payLoad : PayLoad = {userNo : userFind.userNo, userId : userFind.userId}
        return {
            token : this.jwtService.sign(payLoad),
            ...userFind
        }
    }

    async userIdCheck(userId : String) : Promise<UserDTO | undefined | null>{
        const result = await this.userRepository.findByUserId(userId)
        if(result){
            throw new HttpException(Object.assign({
                statusCode : 401,
                message : "이미 존재하는 아이디입니다"
            }), 401)
        }else if(!result){
            return null
        }
    }
    async createUser(createUserDTO : CreateUserDTO) : Promise<CreateUserDTO | undefined | null>{
        createUserDTO.userPw = await this.authRepository.transfomrPassword(createUserDTO.userPw)
        let result = await this.userIdCheck(createUserDTO.userId)
        if(!result){
            this.userRepository.save(createUserDTO)
            return createUserDTO 
        }else{
            throw new UnauthorizedException()
        }
        
    }
    async getUserInfo(userNo : string) : Promise<UserDTO | undefined | null>{
        let result = await this.userRepository.findByUserNo(userNo)
        if(!result){
            throw new UnauthorizedException()
        }
        return result
    }
    async updateUser(userNo : string, updateUserDTO : UpdateUserDTO){
        let result = await this.userRepository.updateUser(userNo, updateUserDTO)
        
    }
    async deleteUser(userNo : string){
        let result = await this.userRepository.deleteUser(userNo)
    }
    async tokenValidUser(payload : PayLoad) : Promise<User | undefined | null>{
        return await this.userRepository.findByUserNo(payload.userId)
    }
}
