import { Response, Request } from 'express';
import { postService } from './post.services';
import { Post } from './post.model';

class PostController {
  private postService: any;
  constructor(postServ: any) {
    console.log(postServ, 'post ssss');
    this.postService = postServ;
  }

  public async index(req: Request, res: Response): Promise<any> {
    try {
      const result = await postService.getOne();
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const result = await postService.create();
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

export default new PostController(postService);
