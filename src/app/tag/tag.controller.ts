import { Response, Request } from 'express';
import { autoInjectable } from 'tsyringe';
import { TagService } from './tag.service';

@autoInjectable()
export class TagController {
  private tagService: TagService;
  constructor(tagService: TagService) {
    this.tagService = tagService;
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async index(req: Request, res: Response): Promise<any> {
    const data = await this.tagService.postTagsFetch();
    return res.status(200).send(data);
  }

  public async create(req: Request, res: Response) {
    const result = await this.tagService.create();
    return res.status(200).send(result);
  }

  public async delete(req: Request, res: Response) {
    try {
      const data = await this.tagService.delete(Number(req.params.id));
      return res.status(200).send({ message: 'sucess' });
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
