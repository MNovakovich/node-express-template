export interface IUser {
    id?:number;
    username: string;
    password: string;
    first_name?: string;
    last_name?: string;
    active?: boolean;
    code?:string
}