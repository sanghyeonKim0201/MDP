import { CreateUserDTO, UpdateUserDTO, UserLoginDTO } from 'src/dto/UserDto';
import { UserService } from 'src/service/UserService';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    login(loginDTO: UserLoginDTO): Promise<void>;
    join(createUserDTO: CreateUserDTO): Promise<void>;
    idCheck(userId: String): Promise<void>;
    getUserInfo(userNo: string): Promise<void>;
    updateUser(userNo: string, updateUserDTO: UpdateUserDTO): Promise<void>;
    deleteUser(userNo: string): Promise<void>;
}
