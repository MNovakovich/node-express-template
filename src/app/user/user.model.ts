import { Model, DataTypes, Sequelize, Association } from 'sequelize';
import { injectable, singleton } from 'tsyringe';
import { Post } from '../posts/post.model';
import { UserAttributes } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
const db = require('../../config/database');

export class User extends Model<
  UserAttributes | CreateUserDto | UpdateUserDto
> {
  id!: number;
  email!: string;
  password!: string;
  createdAt!: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
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
    sequelize: db,
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedAt',
    underscored: true,
  }
);

// User.scope('withPassword').findAll();
/*
  Testing typescript interfaces
*/
async function doStuffWithUserModel() {
  const newUser = await User.create({
    email: 'Johnny@mail.ru',
    password: 'John',
  });

  const updated = await User.update(
    {
      email: 'Johnny@mail.ru',
      password: 'John',
      updatedAt: null,
    },
    { where: { id: 1 } }
  );

  const foundUser = await User.findOne({ where: { email: 'Johnny@mail.ru' } });
  if (foundUser === null) return;
  console.log(foundUser.email);
}
