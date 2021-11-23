import { Router } from 'express';
import { UserController } from '../app/user/user.controller';
import { container } from 'tsyringe';
const route = Router();

const userController = container.resolve(UserController);

route.get('/create', userController.create);
route.get('/', userController.index);
route.get('/:id/delete', userController.delete);

export default route;
