import { DataTypes, Model } from 'sequelize';
import { IUser } from './user.interface';
import db from '../../config/database'

export class User extends Model {
    static associatiate(models: any) {
        console.log(models, 'mmmmm')
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        code: {
            type: DataTypes.STRING,
             allowNull: true
        }
    },
    {
        sequelize:db,
        tableName:'users'
    }
)
