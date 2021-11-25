import { Tag } from './tag.model';
import { Post } from '../posts/post.model';
import { PostTag } from '../post_tag/post_tag.model';
import { injectable } from 'tsyringe';
const { QueryTypes } = require('sequelize');
const db = require('../../config/database');
// import { UserAttributes } from './user.interface';
// import { CreateUserDto } from './dto/create-user.dto';

@injectable()
export class TagService {
  private tagModel;
  private postModel;
  private postTagModel;
  constructor() {
    this.tagModel = Tag;
    this.postModel = Post;
    this.postTagModel = PostTag;
  }
  public getAll = async () => {
    try {
      const data = { name: 'marko' };
      return await this.tagModel.findAll({
        include: [{ model: this.postModel }],
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };
  public async getOne(): Promise<any> {
    try {
      const data = { name: 'marko' };
      return await this.tagModel.findAll({});
    } catch (error: any) {
      console.log(error.message);
    }
  }
  public async create() {
    console.log(' create user controlle');
    try {
      const newUser = await this.tagModel.create({
        username: 'Johnny',
        password: 'John',
      });
      const foundUser = await this.tagModel.findOne({
        where: { username: 'Johnny' },
      });
      if (foundUser === null) return;
    } catch (error: any) {
      console.log(error.message, 'error');
    }
  }

  public async delete(id: any): Promise<any> {
    try {
      const res = await this.tagModel.destroy({
        where: { id },
      });
      return res;
    } catch (error: any) {
      console.log(error.message, 'greska');
    }
  }

  public async postTagsFetch() {
    try {
      const users = await db.query(
        `
        select *, p.title as post_title FROM posts_tags
        INNER JOIN posts p
        on posts_tags.post_id = p.id
      
      
      
      `,
        {
          type: QueryTypes.SELECT,
        }
      );
      //   const data = await this.postTagModel.findAll({
      //     include: [{ model: Post }],
      //   });
      return users;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
