import { Model, DataTypes, Sequelize } from 'sequelize';
import { injectable, singleton } from 'tsyringe';
import db from '../../config/database';
import { User } from '../user/user.model';

export class Post extends Model {
  // public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  // public title!: string;
  // public content?: boolean | null; // for nullable fields
  // public userId!: string;
  // public create: any;
  public userId!: number;
  public static associate(models: any) {
    console.log(models, 'modelli');
    Post.belongsTo(models.user, { foreignKey: 'id' });
  }
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
      references: {
        model: 'user',
        key: 'id',
      },
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
    modelName: 'post',
    tableName: 'posts',
    sequelize: db,
    paranoid: true,
    deletedAt: 'deletedAt',
    underscored: true,
  }
);
