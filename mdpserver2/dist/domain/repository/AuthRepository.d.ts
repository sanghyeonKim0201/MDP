import { User } from "../entity/UserEntity";
import { UserRepository } from "./UserRepository";
export declare class AuthRepository {
    private userRepository;
    constructor(userRepository: UserRepository);
    transfomrPassword(str: string): Promise<string>;
    getAuthenticatedUser(userId: string, userPw: string): Promise<User>;
    verifyPassword(userPw: string, hashUserPw: string): Promise<void>;
}
