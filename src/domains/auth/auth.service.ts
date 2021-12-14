import { User } from '../user/user.model';
import { Post } from '../posts/post.model';
import { injectable } from 'tsyringe';
import { UserAttributes } from '../user/user.interface';
import { serviceResponse } from '../../core/api-response';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { HttpException } from '../../common/excerptions/HttpExerption';
import { StatusCodes } from 'http-status-codes';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UserService } from '../user/user.services';

@injectable()
export class AuthService {
  private userService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async login(data: CreateUserDto) {
    const user = await this.userService.getBy('email', data.email);
    if (!user) {
      throw new HttpException(
        StatusCodes.NOT_FOUND,
        `The user with email: ${user.email} not exists`
      );
    }
  }
}
