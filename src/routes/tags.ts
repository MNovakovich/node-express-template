import { Router } from 'express';
import { TagController } from '../app/tag/tag.controller';
import { container } from 'tsyringe';
const route = Router();

const tagController = container.resolve(TagController);

route.get('/create', tagController.create);
route.get('/', tagController.index);
route.delete('/:id', tagController.delete);

export default route;
