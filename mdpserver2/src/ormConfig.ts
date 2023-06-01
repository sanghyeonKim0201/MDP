import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Picture } from "./domain/entity/PictureEntity";
import { Schedule } from "./domain/entity/ScheduleEntity";
import { User } from "./domain/entity/UserEntity";

export const ormConfig : TypeOrmModuleOptions ={
    type : "mysql",
    host : "localhost",
    port : 3306,
    username : "root",
    password : "1234",
    database : "mdp",
    entities : [User, Picture, Schedule],
    synchronize : true,
    logging : true
}

export const secretKey = "ASDWSADczxc123asd"