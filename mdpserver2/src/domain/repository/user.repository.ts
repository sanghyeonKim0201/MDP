import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, FindOneOptions, Repository } from "typeorm";
import { User } from "../entity/user.entity";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(private dataSource: DataSource){
        super(User, dataSource.createEntityManager())
    }
    async findByUserId(userId : String): Promise<User>{
        const result = await this.createQueryBuilder("users").where("users.u_id = :id", {id : userId}).getOne()
        return result;
    }
    async findByUserNo(userNo : number) : Promise<User>{
        const result = await this.createQueryBuilder("users").where("users.u_no = :no", {no : userNo}).getOne()
        return result
    }
}