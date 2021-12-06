import { Response, Request, NextFunction } from 'express';
import { autoInjectable } from 'tsyringe';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.services';

@autoInjectable()
export class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async index(req: Request, res: Response): Promise<any> {
    const data = await this.userService.getAll();
    return res.status(200).send(data);
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: any = { email: 'njihasssd@mail.ru', password: '11111' };
      const result = await this.userService.create(data);
      return res.status(200).send(result);
    } catch (error: any) {
      console.log(error.message, 'greska ');
      next(error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const data = await this.userService.deleteOne(Number(req.params.id));
      return res.status(200).send({ message: 'sucess' });
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
