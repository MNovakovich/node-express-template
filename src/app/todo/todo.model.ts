import { Model, DataTypes } from "sequelize";
const sequelizeConnection = require( "../../config/database");

export class Todo extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public title!: string;
  public completed!: boolean | null; // for nullable fields
}

Todo.init(
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
    completed: {
      type:  DataTypes.BOOLEAN,
      defaultValue:false
    },
  },
  {
    tableName: "todo",
    sequelize:sequelizeConnection, // passing the `sequelize` instance is required
  }
);


