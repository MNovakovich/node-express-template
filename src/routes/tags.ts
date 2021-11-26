import { Router } from 'express';
import { TagController } from '../app/tag/tag.controller';
import { container } from 'tsyringe';
const router = Router();
const tagController = container.resolve(TagController);

router.get('/create', tagController.create);
router.get('/', tagController.index);
router.delete('/:id', tagController.delete);

export default router;
