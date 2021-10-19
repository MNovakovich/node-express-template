import { Dialect, Sequelize } from 'sequelize'

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
//const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD

console.log({
    dbName,
    dbUser,
    dbHost,
    dbPassword
})

const sequelizeConnection = new Sequelize('node_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
})

export default sequelizeConnection