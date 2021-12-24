import { NextFunction, Request, Response } from 'express';

export abstract class IBaseService {
  abstract findAll(query: any): any;
  abstract findOne(id: number);
  abstract create(data: any): any;
  abstract update(id: number, data: any): any;
  abstract destroy(id: number): any;
}

export abstract class IBaseController {
  abstract index(req: Request, res: Response, next: NextFunction): any;
  abstract show: (eq: Request, res: Response, next: NextFunction) => any;
  abstract create: (req: Request, res: Response, next: NextFunction) => any;
  abstract update: (req: Request, res: Response, next: NextFunction) => any;
  abstract delete: (req: Request, res: Response, next: NextFunction) => any;
}

export interface IRepository {
  findAll(data: any): any;
  findOne(data: any): any;
  create(data: any): any;
  update(id: number, data: any): any;
  destroy(data: any): any;
}
