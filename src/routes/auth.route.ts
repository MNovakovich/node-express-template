import { Router } from 'express';
import { AuthController } from '../domains/auth/auth.controller';
import { container } from 'tsyringe';

import { validationMiddleware } from '../middleware/validation.middleware';
import { CreateUserDto } from '../domains/user/dto/create-user.dto';
const router = Router();

const authController = container.resolve(AuthController);

router.post(
  '/login',
  validationMiddleware(CreateUserDto),
  authController.login
);

router.post(
  '/registration',
  validationMiddleware(CreateUserDto),
  authController.registration
);

export default router;
