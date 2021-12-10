import 'reflect-metadata';
import { Router } from 'express';
import { container } from 'tsyringe';

const bootstrap = () => {
  const router = Router();

  return {
    router,
  };
};

export default bootstrap();
