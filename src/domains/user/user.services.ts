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
    try {
      const data = { name: 'marko' };
      return await this.userRepository.findAll({
        attributes: {
          exclude: ['password', 'updatedAt', 'createdAt'],
        },
        include: [{ model: this.postModel }],
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };
  public async getOne(): Promise<any> {
    try {
      const data = { name: 'marko' };
      return await this.userRepository.findAll({});
    } catch (error: any) {
      console.log(error.message);
    }
  }
  public async create(data: CreateUserDto) {
    console.log(data, 'datqaaa');

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
    const updated = await User.update(
      {
        email: 'Johnny@mail.ru',
        password: 'John',
        deletedAt: null,
      },
      { where: { id: 1 } }
    );
  }

  public async deleteOne(id: any): Promise<any> {
    console.log(id, ' id');
    try {
      const data = { name: 'marko' };
      const res = await this.userRepository.destroy({
        where: { id },
      });

      return res;
    } catch (error: any) {
      console.log(error.message, 'greska');
    }
  }
  public async getById(id): Promise<any> {
    const data = await this.userRepository.getOne(id);
    return data;
  }
}
