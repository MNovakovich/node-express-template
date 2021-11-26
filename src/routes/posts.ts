import { Router } from 'express';
import { PostController } from '../app/posts/post.controler';
import { container } from 'tsyringe';
const router = Router();

const postController = container.resolve(PostController);

router.get('/create', postController.create);
router.get('/all', postController.index);
router.get('/delete', postController.delete);

module.exports = router;
