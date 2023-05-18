import { UpdateUserDTO } from "src/dto/UserDto";
import { DataSource, Repository } from "typeorm";
import { User } from "../entity/UserEntity";
export declare class UserRepository extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
    findByUserId(userId: String): Promise<User>;
    findByUserNo(userNo: string): Promise<User>;
    updateUser(userNo: string, updateUserDTO: UpdateUserDTO): Promise<void>;
    deleteUser(userNo: string): Promise<void>;
}
