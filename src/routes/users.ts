import { Router } from 'express';
import { UserController } from '../domains/user/user.controller';
import { container } from 'tsyringe';
const router = Router();

const userController = container.resolve(UserController);

router.post('/', userController.create);
router.get('/', userController.index);
router.delete('/:id', userController.delete);

module.exports = router;
