import { Model, DataTypes } from "sequelize";
import sequelizeConnection from "../../config/database";

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
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    lastname: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
  },
  {
    tableName: "users",
    sequelize:sequelizeConnection, // passing the `sequelize` instance is required
  }
);

async function doStuffWithUserModel() {
  const newUser = await User.create({
    name: "Johnny",
    preferredName: "John",
  });
  console.log(newUser.id, newUser.name, newUser.preferredName);

  const foundUser = await User.findOne({ where: { name: "Johnny" } });
  if (foundUser === null) return;
  console.log(foundUser.name);
}

