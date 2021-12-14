import { Router } from 'express';
import authRoute from './auth.route';
const postRouter = require('./posts');
const userRouter = require('./users.route');

const tagRoute = require('./tags');
const routes = Router();

routes.use('/auth', authRoute);
routes.use('/posts', postRouter);
routes.use('/users', userRouter);
routes.use('/tags', tagRoute);

export default routes;
