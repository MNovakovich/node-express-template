import 'reflect-metadata';
import { Router } from 'express';
import { container } from 'tsyringe';
import { Caller } from './app/test/callSample';
import { TransientClass } from './app/test/lifecycleClass';
const bootstrap = () => {
  const test = container.resolve(Caller);
  console.log(Caller, 'teeeee');
  const router = Router();
  const caller = new Caller();
  router.get('/tralala', caller.greet);
  return {
    router,
  };
};

export default bootstrap();
