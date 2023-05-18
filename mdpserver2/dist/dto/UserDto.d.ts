export declare class UserDTO {
    userNo?: number;
    userId?: string;
    userPw?: string;
    userPhone?: string;
    userBirth?: string;
    userName1?: string;
    userName2?: string;
}
export declare class CreateUserDTO {
    userId?: string;
    userPw?: string;
    userPhone?: string;
    userBirth?: string;
    userName1?: string;
    userName2?: string;
}
export declare class UpdateUserDTO {
    userId?: string;
    userPw?: string;
    userPhone?: string;
    userBirth?: string;
    userName1?: string;
    userName2?: string;
}
export declare class UserLoginDTO {
    userId: string;
    userPw: string;
}
export declare class UserIdCheckDTO {
    userId: string;
}
