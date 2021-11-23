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
          exclude: ['password', 'updatedAt', 'createdAt', 'deletedAt'],
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
  public async create() {
    console.log(' create user controlle');
    try {
      const newUser = await this.userRepository.create({
        username: 'Johnny',
        password: 'John',
      });
      const foundUser = await this.userRepository.findOne({
        where: { username: 'Johnny' },
      });
      if (foundUser === null) return;
      console.log(foundUser.name);
    } catch (error: any) {
      console.log(error.message, 'error');
    }
  }

  public async delete(id: number): Promise<any> {
    try {
      const data = { name: 'marko' };
      return await this.userRepository.destroy({
        where: { id },
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
