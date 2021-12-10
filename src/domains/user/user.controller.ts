import { Response, Request, NextFunction } from 'express';
import { autoInjectable } from 'tsyringe';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.services';
import { validate } from 'class-validator';
@autoInjectable()
export class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async index(req: Request | any, res: Response): Promise<any> {
    console.log(req.prdez);
    try {
      const data = await this.userService.getAll();
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  public async show(req: Request, res: Response): Promise<any> {
    try {
      const data = await this.userService.getById(Number(req.params.id));
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userDto: CreateUserDto = req.body;

      const data = await this.userService.create(userDto);
      validate(data).then((errors) => {
        // errors is an array of validation errors
        if (errors.length > 0) {
          console.log('validation failed. errors: ', errors);
        } else {
          console.log('validation succeed');
        }
      });
      // if (error) throw new Error(error);
      return res.status(201).send(data);
    } catch (error: any) {
      console.log(error.name, 'greska ss');
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.userService.deleteOne(Number(req.params.id));
      return res.status(200).send({ message: 'sucess' });
    } catch (error: any) {
      console.log(error.message);
      next(error);
    }
  }
}
function next(error: unknown) {
  throw new Error('Function not implemented.');
}
