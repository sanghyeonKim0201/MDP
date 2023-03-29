import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { Fingers } from "./domain/entity/fingers.entity";
import { Picture } from "./domain/entity/picture.entity";
import { Schedule } from "./domain/entity/Schedule.entity";
import { User } from "./domain/entity/user.entity";

export const ormConfig : TypeOrmModuleOptions ={
    type : "mysql",
    host : "localhost",
    port : 3306,
    username : "root",
    password : "1234",
    database : "mdp",
    entities : [User, Picture, Schedule, Fingers],
    synchronize : true,
    logging : true
}

export const secretKey = "ASDWSADczxc123asd"