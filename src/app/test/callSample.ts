import { autoInjectable, container, inject, injectable } from 'tsyringe';
import { TransientClass } from './lifecycleClass';

@autoInjectable()
export class Caller {
  public constructor(private transientClass?: TransientClass) {
    console.log('Caller constructor');
  }
  public async greet(req, res) {
    console.log('Caller greet');
    this.transientClass?.greet();
  }
}
