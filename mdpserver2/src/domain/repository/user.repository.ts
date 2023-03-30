import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO, UpdateUserDTO } from "src/dto/user.dto";
import { DataSource, FindOneOptions, Repository } from "typeorm";
import { User } from "../entity/user.entity";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(private dataSource: DataSource){
        super(User, dataSource.createEntityManager())
    }
    async findByUserId(userId : String): Promise<User>{
        return await this.createQueryBuilder("users").where("users.u_id = :id", {id : userId}).getOne()
    }
    async findByUserNo(userNo : string) : Promise<User>{
        return await this.createQueryBuilder("users").where("users.u_no = :no", {no : Number.parseInt(userNo)}).getOne()
    }
    async updateUser(userNo : string,updateUserDTO : UpdateUserDTO){
        const {userId : userId, userPw : userPw, userPhone : userPhone, userBirth : userBirth, userName1 : userName1, userName2 : userName2} = updateUserDTO
        console.log(userId, userPw, userPhone, userBirth, userName1, userName2)
        await this.createQueryBuilder("users").update(User).set({
            userId : userId,
            userPw : userPw,
            userPhone : userPhone,
            userBirth : userBirth,
            userName1 : userName1,
            userName2 : userName2    
        }).where("users.u_no = :userNo",{userNo : userNo}).execute()
    }
    async deleteUser(userNo : string){
        await this.createQueryBuilder("users").delete().from(User).where("users.u_no = :userNo",{
            userNo : Number.parseInt(userNo)
        }).execute()
    }
}