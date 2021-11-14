import { Model, DataTypes } from 'sequelize';
import { injectable, singleton } from 'tsyringe';
const sequelizeConnection = require('../../config/database');

@singleton()
@injectable()
export class User extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public preferredName!: string | null; // for nullable fields
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(128),
      allowNull: false,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING(128),
      allowNull: true,
      field: 'last_name',
    },
  },
  {
    tableName: 'users',
    sequelize: sequelizeConnection, // passing the `sequelize` instance is required
  }
);

async function doStuffWithUserModel() {
  const newUser = await User.create({
    first_name: 'Johnny',
    last_name: 'John',
  });

  const foundUser = await User.findOne({ where: { first_name: 'Johnny' } });
  if (foundUser === null) return;
  console.log(foundUser.name);
}
