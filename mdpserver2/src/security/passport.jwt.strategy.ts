import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { secretKey } from "src/ormConfig";
import { UserService } from "src/service/user.service";
import { PayLoad } from "./payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService :UserService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: secretKey
            }
        )
    }
    async validate(payLoad : PayLoad, done : VerifiedCallback): Promise<any>{
        const user = await this.userService.tokenValidUser(payLoad)
        if(!user){
            return done(new UnauthorizedException({messgae : ""}))
        }
        return done(null, user)
    }
} 