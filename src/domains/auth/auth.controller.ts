import { Response, Request, NextFunction } from 'express';
import { autoInjectable } from 'tsyringe';
import { HttpException } from '../../common/excerptions/HttpExerption';
import { UserService } from '../user/user.services';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from './auth.service';

@autoInjectable()
export class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const res = await this.authService.login(req.body);
      return res;
    } catch (error) {
      next(error);
    }
  }
}
