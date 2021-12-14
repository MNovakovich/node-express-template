import { Router } from 'express';
import userRouter from './users.route';
import tagRouter from './tags';
import postRouter from './posts';
const router = Router();

router.use('/users', userRouter);
router.use('/tags', tagRouter);
router.use('/posts', postRouter);

export default router;
