import { Router } from 'express';
import { UserController } from '../domains/user/user.controller';
import { container } from 'tsyringe';

import { validationMiddleware } from '../middleware/validation.middleware';
import { CreateUserDto } from '../domains/user/dto/create-user.dto';
const router = Router();

const userController = container.resolve(UserController);

router.post('/', validationMiddleware(CreateUserDto), userController.create);
router.get('/', userController.index);
router.get('/:id', userController.show);
router.delete('/:id', userController.delete);

export default router;
