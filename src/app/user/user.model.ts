import { Model, DataTypes, Sequelize, Association } from 'sequelize';
import { injectable, singleton } from 'tsyringe';
import { Post } from '../posts/post.model';
const sequelizeConnection = require('../../config/database');

export class User extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public email?: string;
  public password?: string;
  public preferredName!: string | null; // for nullable field

  // associate(models: any) {
  //   console.log(models, 'models');
  //   User.hasMany(models.task, { foreignKey: 'userId' });
  // }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(258),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(258),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()'),
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    modelName: 'user',
    tableName: 'users',
    sequelize: sequelizeConnection, // passing the `sequelize` instance is required
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedAt',
    underscored: true,
  }
);

// User.scope('withPassword').findAll();
async function doStuffWithUserModel() {
  const newUser = await User.create({
    first_name: 'Johnny',
    last_name: 'John',
  });

  const foundUser = await User.findOne({ where: { first_name: 'Johnny' } });
  if (foundUser === null) return;
  console.log(foundUser.email);
}
