import { UserRepository } from 'src/domain/repository/UserRepository';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from 'src/dto/UserDto';
import { UserPayLoad } from 'src/security/PayloadInterface';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from 'src/domain/repository/AuthRepository';
export declare class UserService {
    private userRepository;
    private jwtService;
    private authRepository;
    constructor(userRepository: UserRepository, jwtService: JwtService, authRepository: AuthRepository);
    login(userId: string, userPw: string): Promise<{
        token: string;
    } | undefined>;
    userIdCheck(userId: String): Promise<UserDTO | undefined | null>;
    createUser(createUserDTO: CreateUserDTO): Promise<CreateUserDTO | undefined | null>;
    getUserInfo(userNo: string): Promise<UserDTO | undefined | null>;
    updateUser(userNo: string, updateUserDTO: UpdateUserDTO): Promise<void>;
    deleteUser(userNo: string): Promise<void>;
    tokenValidUser(payload: UserPayLoad): Promise<UserDTO | undefined | null>;
}
