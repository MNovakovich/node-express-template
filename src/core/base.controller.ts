import { injectable } from 'tsyringe';
@injectable()
export class BaseController {
  service: any;
  constructor(service: any) {
    this.service = service;
  }
}
