export interface Message {
    userId: string;
    message: string;
    timestamp: string;
}
export interface User {
    id?: string;
    username: string;
    fullName: string;
    color: string;
    password: string;
}

export interface UsersObject {
    [key: string]: User
}
