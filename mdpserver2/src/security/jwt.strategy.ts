import { HttpException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/domain/entity/user.entity";
import { UserRepository } from "src/domain/repository/user.repository";
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
                message : "유저를 찾을 수 없습니다"
            }), 401)
        }
        return user;
    }
}