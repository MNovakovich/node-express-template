import { IBaseService, IRepository } from './base.interfaces';
import { HttpException } from '../common/excerptions/HttpExerption';
import { StatusCodes } from 'http-status-codes';
import { paginateFilterUrl } from './paginationAndFilteringDecorator';

export class BaseService<T> implements IBaseService {
  public repository: T | any;

  constructor(repository) {
    this.repository = repository;
  }

  findAll = async (query) => {
    try {
      const res = await paginateFilterUrl.query(this.repository, query, {});
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  //@ts-ignore
  public async findOne(id: number): any {
    try {
      const result = this.repository.findOne({ where: { id } });
      return result;
    } catch (error: any) {
      console.log(error.message);
    }
  }
  public async create(data) {
    try {
      const newPost = await this.repository.create(data);
      await newPost.save();
      return newPost;
    } catch (error: any) {
      console.log(error.message, 'error');
    }
  }

  public async update(id, data) {
    const user = await this.repository.update(data, { where: { id } });
    return user;
  }

  public async destroy(id: number): Promise<any> {
    const res = await this.repository.findOne({
      where: { id },
    });
    if (!res) {
      throw new HttpException(
        StatusCodes.CONFLICT,
        `this item not exists in database!`
      );
    }
    await res.destroy();
    return res;
  }
}
