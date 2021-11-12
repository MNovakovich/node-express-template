import { Post } from './post.model';
const sequelizeConnection = require('../../config/database');
const { QueryTypes } = require('sequelize');
//import { CreatePostDto } from './dto/create-post.dto';

export class PostService {
  private postRepository;
  constructor(postRepository: typeof Post) {
    this.postRepository = new postRepository();
  }

  public async getAll() {
    try {
      const users = await sequelizeConnection.query(
        'SELECT * FROM `posts` WHERE  deletedAt is NULL',
        {
          type: QueryTypes.SELECT,
        }
      );
      return users;
    } catch (error) {}
  }

  public async getOne(): Promise<any> {
    try {
      const result = await Post.findAll({});
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

export const postService = new PostService(Post);
