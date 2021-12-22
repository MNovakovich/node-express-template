import { Response, Request } from 'express';
import { autoInjectable, injectable, inject } from 'tsyringe';
import { PostService } from './post.services';
import { Post } from './post.model';
import { BaseController } from '../../core/base.controller';
import { UserService } from '../user/user.services';

@autoInjectable()
export class PostController extends BaseController {
  constructor(postService?: PostService) {
    super(postService);
  }
}
