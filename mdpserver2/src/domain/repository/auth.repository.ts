import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import { resolve } from "path";
import { User } from "../entity/user.entity";
import { UserRepository } from "./user.repository";
@Injectable()
export class AuthRepository{
    constructor(private userRepository : UserRepository){
        this.userRepository = userRepository
    }
    async transfomrPassword(str : string){
        return await bcrypt.hash(str, 10)
    }
    async getAuthenticatedUser(userId : string, userPw : string) : Promise<User>{
        try{
            const user = await this.userRepository.findByUserId(userId)
            if(!user){
                throw new HttpException("잘못된 인증 정보입니다", 400)
            }
            await this.verifyPassword(userPw, user.userPw)
            return user
        }catch(error){
            throw new HttpException("잘못된 인증 정보입니다", 400)
        }
    }
    async verifyPassword(userPw : string, hashUserPw : string) : Promise<void>{
        const isPasswordMatching = await bcrypt.compare(userPw, hashUserPw)
        if(!isPasswordMatching){
            throw new HttpException("잘못된 인증 정보입니다", 400)
        }
        return Promise.resolve()
    }
}