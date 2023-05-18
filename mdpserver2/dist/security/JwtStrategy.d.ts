import { Strategy } from "passport-jwt";
import { User } from "src/domain/entity/UserEntity";
import { UserRepository } from "src/domain/repository/UserRepository";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: any): Promise<User>;
}
export {};
