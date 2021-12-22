import { Router } from 'express';
import { PostController } from '../domains/posts/post.controler';
import { container } from 'tsyringe';
const router = Router();

const postController = container.resolve(PostController);
router.get('/', postController.index);
router.get('/:id', postController.show);
router.post('/', postController.create);
router.patch('/:id', postController.update);
router.delete('/:id', postController.delete);

export default router;
