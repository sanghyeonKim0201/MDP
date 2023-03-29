import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/domain/repository/user.repository';
import { UserDTO, UserLoginDTO } from 'src/dto/user.dto';

@Injectable()
export class UserService {
    constructor(private userRepository : UserRepository){
        this.userRepository = userRepository;
    }

    async login(loginDTO : UserLoginDTO){
        return
    }
    async userIdCheck(userId : String) : Promise<UserDTO | undefined>{
        const result = await this.userRepository.findByUserId(userId)
        return result
    }
    async createUser(userDTO : UserDTO){
        const result = this.userIdCheck(userDTO.userId)
    }
}
