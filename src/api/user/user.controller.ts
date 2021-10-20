import { Response, Request } from 'express'
import { userService } from './user.services'
import { User } from "./user.model";

class UserController {
    private userRepository: any;
    constructor(userRepository:any) {
       this.userRepository =  userRepository;       
    }
    public async index(req:Request, res:Response):Promise<any> {
        const data = await userService.getOne();
        return res.status(200).send(data);
    }
    public async create(req:Request, res: Response) {
       const result = await userService.create();
       return res.status(200).send(result);
    }
}


export default new UserController(User);