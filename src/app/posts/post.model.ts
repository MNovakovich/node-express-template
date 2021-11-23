import { Model, DataTypes, Sequelize } from 'sequelize';
import { injectable, singleton } from 'tsyringe';
const sequelizeConnection = require('../../config/database');

@singleton()
@injectable()
export class Post extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public title!: string;
  public content?: boolean | null; // for nullable fields
  public userId!: string;
  public create: any;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: 'user_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('NOW()'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('NOW()'),
    },
  },
  {
    tableName: 'posts',
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);