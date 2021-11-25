import { Model, DataTypes, Sequelize, Association } from 'sequelize';
import { injectable, singleton } from 'tsyringe';
import { Post } from '../posts/post.model';
import { PostTag } from '../post_tag/post_tag.model';
const sequelizeConnection = require('../../config/database');

export class Tag extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public email?: string;
  public password?: string;
  public preferredName!: string | null; // for nullable field
}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(258),
      allowNull: false,
    },
  },
  {
    modelName: 'tag',
    tableName: 'tags',
    sequelize: sequelizeConnection, // passing the `sequelize` instance is required
    underscored: true,
    timestamps: false,
  }
);

//Tag.associate = models => {
// console.log(sequelizeConnection.models);
Tag.belongsToMany(sequelizeConnection.models.post, { through: PostTag });
