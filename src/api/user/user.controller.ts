import { Response, Request } from 'express'
import { userService } from './user.services'
import { User } from "./user.model";

class UserController {
    private userService: any;
    constructor(userService: any) {
       this.userService =  userService;       
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


export default new UserController(userService);