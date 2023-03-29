import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/domain/repository/user.repository';
import { CreateUserDTO, UpdateUserDTO, UserDTO, UserIdCheckDTO, UserLoginDTO } from 'src/dto/user.dto';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class UserService {
    constructor(private userRepository : UserRepository){
        this.userRepository = userRepository;
    }
    
    // async login(userLoginDTO : UserLoginDTO) : Promise<UserDTO | undefined>{
        
    // }
    async userIdCheck(userId : String) : Promise<UserDTO | undefined | null>{
        const result = await this.userRepository.findByUserId(userId)
        if(result){
            return result
        }else if(!result){
            return null
        }
    }
    async createUser(createUserDTO : CreateUserDTO) : Promise<CreateUserDTO | undefined | null>{
        let result = await this.userIdCheck(createUserDTO.userId)
        if(!result){
            this.userRepository.save(createUserDTO)
            return createUserDTO
        }else{
            return null
        }
        
    }
    async getUserInfo(userNo : string) : Promise<UserDTO | undefined | null>{
        let result = await this.userRepository.findByUserNo(userNo)
        if(!result){
            return null
        }
        return result
    }
    async updateUser(userNo : string, updateUserDTO : UpdateUserDTO){
        let result = await this.userRepository.updateUser(userNo, updateUserDTO)
        
    }
    async deleteUser(userNo : string){
        let result = await this.userRepository.deleteUser(userNo)
    }
}
