import { Router } from 'express';
import authRouter from './auth.route';
import userRouter from './users.route';
import tagRouter from './tags';
import postRouter from './posts.route';
const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/tags', tagRouter);
router.use('/posts', postRouter);

export default router;
