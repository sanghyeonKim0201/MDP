import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    userNo: number;
    userId: string;
    userPw: string;
    userPhone: string;
    userBirth: string;
    userName1: string;
    userName2: string;
}
