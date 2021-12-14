import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import DB from '../config/database';
import { HttpException } from '../common/excerptions/HttpExerption';
import { DataStoredInToken } from '../domains/auth/auth.interface';

const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  try {
    const Authorization =
      //@ts-ignore
      req.header('Authorization').split('Bearer ')[1] || null;

    if (Authorization) {
      const secretKey: string = process.env.JWT_KEY || 'secretKey';
      const verificationResponse = jwt.verify(Authorization, secretKey);
      const userId = verificationResponse;
      //const findUser = await DB.Users.findByPk(userId);
      console.log(userId, 'finddd');

      if (verificationResponse) {
        req.user = verificationResponse;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
