import { Router } from 'express';
import { PostController } from '../app/posts/post.controler';
import { container } from 'tsyringe';
const route = Router();

const postController = container.resolve(PostController);

route.get('/create', postController.create);
route.get('/all', postController.index);
route.get('/delete', postController.delete);

export default route;
