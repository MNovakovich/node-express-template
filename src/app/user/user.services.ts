import { User } from './user.model';
import { Post } from '../posts/post.model';
import { injectable } from 'tsyringe';
import { UserAttributes } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
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
    console.log(data, 'data');
    try {
      const newUser = await this.userRepository.create(data);
      return newUser;
      // if (foundUser === null) return;
    } catch (error: any) {
      console.log(error.message, '-error');
    }
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
}
