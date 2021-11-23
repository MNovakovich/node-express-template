import { Router } from 'express';
import postRouter from './posts';
import userRouter from './users';

const routes = Router();

routes.use('/posts', postRouter);
routes.use('/users', userRouter);

export default routes;
