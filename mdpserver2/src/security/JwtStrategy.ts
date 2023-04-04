import { HttpException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/domain/entity/UserEntity";
import { UserRepository } from "src/domain/repository/UserRepository";
import { secretKey } from "src/ormConfig";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userRepository : UserRepository){
        super({
            secretOrKey : secretKey,
            jwtFromRequest :ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload){
        const {userId} = payload
        const user : User = await this.userRepository.findByUserId(userId)
        if(!user){
            throw new HttpException(Object.assign({
                statusCode : 401,
                message : "인증을 하여 주십시오"
            }), 401)
        }
        return user;
    }
}