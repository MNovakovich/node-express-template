import { User } from "./user.model";
import { IUser  } from "./user.interface";
import { CreateUserDto } from './dto/create-user.dto' 

interface Response{
    name:string;
}
export class UserService {
    private userRepository;
    constructor(userRepository: typeof User) {
        this.userRepository = userRepository
    }

    public async getOne():Promise<any> {
        try {
            const data = {name:'marko'}
            return await this.userRepository.findAll({});
        } catch (error:any) {
            console.log(error.message);
        }
    }
    public async create() {
        console.log(' create user controlle')
         
        return {data:'test from controller'}
       try {
         const user  = await this.userRepository.create({
             username:'marko',
             password:'123'
         })
        return user;
     } catch (error:any) {
         console.log(error.message, 'error')
     }
    }

}


export const userService =  new UserService( User ) ;