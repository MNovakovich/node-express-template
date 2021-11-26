import { Router } from 'express';
const postRouter = require('./posts');
const userRouter = require('./users');
const tagRoute = require('./tags');
const routes = Router();

routes.use('/posts', postRouter);
routes.use('/users', userRouter);
routes.use('/tags', tagRoute);

export default routes;
