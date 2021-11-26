import { Router } from 'express';
import postRouter from './posts';
import userRouter from './users';
import tagRouter from './tags';

const routes = Router();

routes.use('/posts', postRouter);
routes.use('/users', userRouter);
routes.use('/tags', tagRouter);

export default routes;
