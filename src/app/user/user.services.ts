import { User } from "./user.model";
import { UserAttributes } from "./user.interface";
import { CreateUserDto } from './dto/create-user.dto'


export class UserService {
    private userRepository;
    constructor(userRepository: typeof User) {
        this.userRepository = userRepository
    }

    public async getOne(): Promise<any> {
        try {
            const data = { name: 'marko' }
            return await this.userRepository.findAll({});
        } catch (error: any) {
            console.log(error.message);
        }
    }
    public async create() {
        console.log(' create user controlle')
        try {
            const newUser = await this.userRepository.create({
                username: "Johnny",
                password: "John",
            });
            const foundUser = await this.userRepository.findOne({ where: { username: "Johnny" } });
            if (foundUser === null) return;
            console.log(foundUser.name);
        } catch (error: any) {
            console.log(error.message, 'error')
        }
    }

}


export const userService = new UserService(User);