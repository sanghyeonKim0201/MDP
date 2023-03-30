import { Injectable } from "@nestjs/common";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { User } from "src/domain/entity/user.entity";
import { AuthRepository } from "src/domain/repository/auth.repository";
import { UserService } from "src/service/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authRepositroy : AuthRepository){
        super({
            usernameField : "userId"
        })
        this.authRepositroy = authRepositroy
        
    }
    async validate(userId : string, userPw : string) : Promise<User>{
        return this.authRepositroy.getAuthenticatedUser(userId, userPw)
    }
}