import { injectable } from 'tsyringe';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { HttpException } from '../../common/excerptions/HttpExerption';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../user/user.services';
import jwt from 'jsonwebtoken';
const bcrypt = require('bcryptjs');
@injectable()
export class AuthService {
  private userService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async login(data: CreateUserDto) {
    const user = await this.validateUser(data);
    const token = await this.generateToken(user);
    return token;
  }
  public async registration(data: CreateUserDto) {
    const user = await this.userService.create(data);
    return data;
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getBy('email', userDto.email);
    if (!user) {
      throw new HttpException(
        StatusCodes.NOT_FOUND,
        `The user with email: ${user.email} not exists`
      );
    }
    const isPasswordMatching = bcrypt.compareSync(
      userDto.password,
      user.password
    ); // false
    if (!isPasswordMatching)
      throw new HttpException(409, "You're password not matching");

    return user;
  }
  async generateToken(user) {
    const payload = { id: user.id, email: user.email };
    const secretKey: string = process.env.JWT_KEY || 'secretKey';
    const expiresIn = '24h'; // 60 * 60;
    return {
      token: jwt.sign(payload, secretKey, { expiresIn }),
    };
  }
}
