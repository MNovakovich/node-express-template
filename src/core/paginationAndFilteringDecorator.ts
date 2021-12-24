const Sequelize = require('sequelize');
const Op = Sequelize.Op;

interface IOrderOptions {
  include?: any;

  direction?: 'ASC' | 'DESC';
}
export class PaginateFilterUrl {
  models = null;
  setModels(models) {
    this.models = models;
  }
  public getModels() {
    return this.models;
  }

  public getModelByName(name) {
    if (this.models && this.models.hasOwnProperty(name)) {
      return this.models[name];
    }
  }

  public isModelExists(name) {
    if (this.models && this.models.hasOwnProperty(name)) {
      return true;
    }
    return false;
  }

  /**
   *
   * @param {*} Model // Sequelize Model  User , Post ect.
   * @param query.fields : {
   *    options: string ,
   *    default: null,
   *    desc: "return particular fields of model. If you want to select multi fields, just separate them with comma ',' "
   *    example: 'firstName, lastName, id' ect'
   * }
   * @param query.page {
   *    optional
   *    description: the property page return current page. If exists, in the response we will get info about page(current), totalPages and offset
   * }
   * @param query.orderBy `{
   *      optional
   *      description: return ordered column
   * }
   * @param query.direction {
   *     options: ASC | DESC
   *     default: ASC
   *     description: ordering direction
   *  }
   * @param query.filter.[colName] {
   *     optional,
   *     description: We use it for filtering table by column.
   *                  on the column name add prefixer filter. and value of it.
   *                  example:
   *                     ?filter.user_name=Joh&filter.title=My New Po
   *   }
   * *@param query.where.[colName] {
   *     optional,
   *     description: where statement
   *                  example userTable:
   *                     ?where.Name=John&where.role_id=1
   *   }
   *
   * * *@param query.include.[ModelName] {
   *     optional,
   *     description:  Include specific model
   *
   *    example:
   *      include=User&include=Role;fields:name,id
   *   }
   *
   * @param options {
   *   optional,
   *   type: object
   *   properties: {
   *       include : resource: https://sequelize.org/master/manual/eager-loading.html#using--code-findandcountall--code--with-includes
   *
   *   }
   * }
   *
   * Example:
   *  ?status=all&orderBy=BVHNummer&direction=DESC&filter.BVHNummer=B&filter.Ort=KRI
   */

  async query(Model, query, options: IOrderOptions) {
    //console.log(options, 'optionssss');
    //console.log(query, 'query');

    //console.log(this.models, 'models');
    // example
    //?status=all&orderBy=BVHNummer&direction=DESC&filter.BVHNummer=B&filter.Ort=KRI
    const limit: any =
      query.page || 1 ? (query.limit ? Number(query.limit) : 15) : null;
    const offset = query.page ? 0 + (query.page - 1) * limit : null;

    let order: any[] = [];
    if (query.orderBy) {
      const direction = query.direction ? query.direction : 'ASC'; //DESC & ASC
      if (query.orderBy.includes('.')) {
        let [orderedModel, orderedColumn] = query.orderBy.split('.');
        const fk = orderedModel.toLowerCase() + '_id';
        order.push([
          {
            model: orderedModel,
            foreignKey: fk,
          },
          orderedColumn,
          direction,
        ]);
      } else {
        order.push([query.orderBy, direction]);
      }
    }

    let filters = this.filterQuery(query);

    let dbModel;

    let where = { ...filters };

    let includes: any = this.includes(query.include)
      ? this.includes(query.include)
      : [];

    if (options.include) {
      includes = [...includes, ...options.include];
    }
    dbModel = await Model.findAndCountAll({
      offset,
      limit,
      order,
      where,
      include: includes,
      attributes: this.getAttributes(query.fields),
    });

    if (query.page) {
      dbModel = {
        page: Number(query.page),
        totalPages: Math.ceil(dbModel.count / limit),
        ...dbModel,
      };
    }

    return dbModel;
  }
  filterQuery = (query) => {
    let key,
      keys = {};

    for (key in query) {
      if (
        query.hasOwnProperty(key) &&
        /filter/.test(key) &&
        typeof query[key] !== 'undefined'
      ) {
        let tableName = key.slice(7);
        keys[tableName] = { [Op.like]: `${query[key]}%` };
      }
      if (
        query.hasOwnProperty(key) &&
        /where/.test(key) &&
        typeof query[key] !== 'undefined'
      ) {
        let tableName = key.slice(6);
        keys[tableName] = { [Op.like]: `${query[key]}` };
      }
    }

    return keys;
  };

  getAttributes(attributes) {
    if (!attributes) return null;
    if (attributes.includes(',')) {
      let splitedAttr = attributes.split(',');
      if (splitedAttr.length > 0) return splitedAttr.map((item) => item.trim());
      return splitedAttr;
    }

    return [attributes];
  }

  includes = (includes) => {
    const data = [];
    if (typeof includes === 'string') {
      const data = includes.includes(';')
        ? [this.splitIncludes(includes)]
        : this.isModelExists(includes) && [
            { model: this.getModelByName(includes) },
          ];
      return data;
    } else if (includes !== null && typeof includes === 'object') {
      const data = [];
      includes.forEach((item) => {
        if (item.includes(';')) {
          let properties = item.split(';');

          const [model, ...otherProps] = properties;
          if (this.isModelExists(model)) data.push(this.splitIncludes(item));
        } else {
          this.isModelExists(item) &&
            data.push({
              model: this.getModelByName(item),
            });
        }
      });
      return data;
    } else {
      return false;
    }
  };

  splitIncludes(include) {
    let properties = include.split(';');

    const [model, ...otherProps] = properties;
    if (!this.isModelExists(model)) return null;
    let data: any | null = null;

    data = { model: this.getModelByName(model) };

    //@ts-ignore
    let fields = otherProps.find((item: any) => new RegExp('/^fields:/'));
    if (this.isModelExists(model) && fields && fields !== '') {
      fields = fields.split(':').slice(1)[0].split(',');
      data.attributes = fields;
    }
    if (this.isModelExists(model)) return data;
  }
}

export const paginateFilterUrl = new PaginateFilterUrl();
