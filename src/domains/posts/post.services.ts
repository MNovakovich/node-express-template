import { injectable, inject } from 'tsyringe';
import { Post } from './post.model';
import { User } from '../user/user.model';
import { Tag } from '../tag/tag.model';
const db = require('../../config/database');
const { QueryTypes } = require('sequelize');
//import { CreatePostDto } from './dto/create-post.dto';

@injectable()
export class PostService {
  public postRepository: any;
  public userRepository: any;
  public tagModel: any;
  constructor() {
    this.postRepository = Post;
    this.userRepository = User;
    this.tagModel = Tag;
  }

  getAll = async () => {
    try {
      const users = await db.query(
        'SELECT * FROM `posts` WHERE  deleted_at is NULL',
        {
          type: QueryTypes.SELECT,
        }
      );
      //   console.log(this.userRepository);

      const res = await this.postRepository.findAll({});
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //@ts-ignore
  public async getOne(): any {
    try {
      const result = this.postRepository.findAll({
        include: [{ model: this.userRepository }, { model: this.tagModel }],
      });
      return result;
    } catch (error: any) {
      console.log(error.message);
    }
  }
  public async create() {
    try {
      const newPost = await Post.create({
        title: 'jupi ja eee jupi ja ooo',
        content: 'jasar je vrlo dobar tip',
        userId: 1,
      });
      newPost.save();
      return newPost;
    } catch (error: any) {
      console.log(error.message, 'error');
    }
  }
}
// npx sequelize-auto -h localhost -d timetracking_app -u root -x root -p 3306  --dialect mysql -c ./src/config/db.ts -o ./models -l ts --useDefine ts  --singularize, --sg
