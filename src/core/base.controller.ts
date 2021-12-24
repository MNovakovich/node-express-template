import { NextFunction, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { IBaseController } from './base.interfaces';

@injectable()
export class BaseController implements IBaseController {
  service: any;
  constructor(service: any) {
    this.service = service;
  }

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.findAll(req.query);
      return res.status(200).send(data);
    } catch (error: any) {
      console.log(error.message);
      next(error);
    }
  };
  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.findOne(Number(req.params.id));
      return res.status(200).send(data);
    } catch (error: any) {
      console.log(error.message);
      next(error);
    }
  };
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.create(req.body);
      return res.status(201).send(data);
    } catch (error: any) {
      console.log(error.message);
      next(error);
    }
  };
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.update(Number(req.params.id), req.body);
      return res.status(200).send(data);
    } catch (error: any) {
      console.log(error.message);
      next(error);
    }
  };
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.destroy(Number(req.params.id));
      return res.status(200).send(data);
    } catch (error: any) {
      console.log(error.message);
      next(error);
    }
  };
}
