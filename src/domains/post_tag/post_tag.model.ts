import { Model, DataTypes, Sequelize, Association } from 'sequelize';
import { injectable, singleton } from 'tsyringe';
import { Post } from '../posts/post.model';
import db from '../../config/database';

export class PostTag extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public email?: string;
  public password?: string;
  public preferredName!: string | null; // for nullable field
}

PostTag.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    postId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id',
      },
      field: 'post_id',
    },

    tagId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'tag',
        key: 'id',
      },
      field: 'tag_id',
    },
  },
  {
    modelName: 'post_tag',
    tableName: 'posts_tags',
    sequelize: db, // passing the `sequelize` instance is required
    underscored: true,
    timestamps: false,
  }
);

//Tag.associate = models => {

// Tag.belongsToMany(sequelizeConnection.models.post, { through: 'posts_tags' });
// Post.belongsToMany(sequelizeConnection.models.tag, { through: 'posts_tags' });
