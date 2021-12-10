import { Response, Request, NextFunction } from 'express';
import { autoInjectable } from 'tsyringe';
import { HttpException } from '../../common/excerptions/HttpExerption';
import { UserService } from './user.services';
import { StatusCodes } from 'http-status-codes';
import { User } from './user.model';
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

  public async index(req: Request | any, res: Response, next: NextFunction) {
    try {
      const data = await this.userService.getAll();
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  public async show(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.userService.getById(Number(req.params.id));

      if (!data) {
        throw new HttpException(
          StatusCodes.NOT_FOUND,
          'The user is not found!'
        );
      }
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.userService.create(req.body);
      return res.status(201).send(data);
    } catch (error: any) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.userService.deleteOne(Number(req.params.id));
      return res.status(200).send({ message: 'sucess' });
    } catch (error: any) {
      next(error);
    }
  }
}
