import { User } from "./user.model";

class UserController {
    userRepository: any;
    constructor(userRepository:any) {
       this.userRepository =  userRepository;
       console.log(this.userRepository, ' - userRepo')
    }

    async create(req:Request, res: Response) {
          console.log(' create user controlle')
          //@ts-ignore
         // return res.status(200).send({data:'test from controller'})
          try {
            const user  = await this.userRepository.create({
                username:'marko',
                password:'123'
            })
            // @ts-ignore
            return res.status(200).send(user);
        } catch (error:any) {
            console.log(error.message, 'error')
        }
    }
}


export default new UserController(User);