import { User } from './user.model';
import { Post } from '../posts/post.model';
import { injectable } from 'tsyringe';
import { UserAttributes } from './user.interface';
import { serviceResponse } from '../../core/api-response';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpException } from '../../common/excerptions/HttpExerption';
import { StatusCodes } from 'http-status-codes';
import { UpdateUserDto } from './dto/update-user.dto';

@injectable()
export class UserService {
  private userRepository;
  private postModel;

  constructor() {
    this.userRepository = User;
    this.postModel = Post;
  }

  public getAll = async () => {
    const data = await this.userRepository.findAll({
      attributes: {
        exclude: ['password', 'updatedAt', 'createdAt'],
      },
      include: [{ model: this.postModel }],
    });
    return data;
  };

  public async getOne(id: number): Promise<any> {
    const data = await this.userRepository.findAll({});
    return data;
  }

  public async create(data: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (user) {
      throw new HttpException(
        StatusCodes.CONFLICT,
        `You're email ${user.email} already exists ${StatusCodes.CONFLICT} `
      );
    }
    const newUser = await this.userRepository.create(data);
    return newUser;
  }

  public async update(id, data: UpdateUserDto) {
    const user = await User.update(data, { where: { id } });
    return user;
  }

  public async deleteOne(id: any): Promise<any> {
    const res = await this.userRepository.destroy({
      where: { id },
    });
    return res;
  }
  public async getById(id: number): Promise<any> {
    const data = await this.userRepository.findOne({ where: { id } });
    return data;
  }
}
