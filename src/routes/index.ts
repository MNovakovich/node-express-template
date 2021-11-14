import { Router } from 'express';
import postRouter from './posts';

const postIndexRouter = Router();

postIndexRouter.use('/', postRouter);

export default postIndexRouter;
