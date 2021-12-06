import { Model, DataTypes, Sequelize, Association } from 'sequelize';
import { injectable, singleton } from 'tsyringe';
import { Post } from '../posts/post.model';
import { UserAttributes } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
const db = require('../../config/database');

export class User extends Model<UserAttributes | CreateUserDto> {
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
      validate: {
        isEmail: {
          msg: 'Must be a valid email address',
        },
      },
    },
    password: {
      type: DataTypes.STRING(258),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Field is requred!',
        },
        // max: {
        //   args: [32],
        //   msg: 'Maximum 32 characters allowed in password',
        // },
        // min: {
        //   args: [4],
        //   msg: 'Minimum 4 characters required in password',
        // },
        len: {
          args: [4, 32],
          msg: 'String length is not in this range',
        },
      },
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
