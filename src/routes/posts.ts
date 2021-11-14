import { Router } from 'express';
import { PostController } from '../app/posts/post.controler';
import { container } from 'tsyringe';
const route = Router();

const postController = container.resolve(PostController);

route.get('/posts/create', postController.create);
route.get('/posts/all', postController.index);
route.get('/posts/delete', postController.delete);

export default route;
