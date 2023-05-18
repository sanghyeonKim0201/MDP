import { UserDTO } from "src/dto/UserDto";
export declare class LoginResponseData {
    user: UserDTO;
    token: string;
}
export declare class FailResponseData {
    statusCode: number;
    message: string;
}
export declare class SuccessResponseData {
    statusCode: number;
    message: string;
}
