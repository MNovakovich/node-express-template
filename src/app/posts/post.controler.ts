import { Response, Request } from 'express';
import { autoInjectable, injectable, inject } from 'tsyringe';
import { PostService } from './post.services';
import { Post } from './post.model';
import { BaseController } from '../../core/base.controller';
import { UserService } from '../user/user.services';

@autoInjectable()
export class PostController {
  postService: PostService | any;
  userService: UserService | any;

  constructor(postService?: PostService, userService?: UserService) {
    this.postService = postService;
    this.userService = userService;
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async index(req: Request, res: Response): Promise<any> {
    try {
      const result = await this.postService.getOne();
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const result = await this.postService.create();
      return res.status(200).send(result);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async delete(_: any, res: any) {
    try {
      const remove = await Post.destroy({
        where: { id: 2 },
      });
      return res.status(200).send({ message: 'success' });
    } catch (error) {}
  }
}
