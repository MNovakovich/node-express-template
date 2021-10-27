import "dotenv"
import "reflect-metadata"
import express, { Application, Request, Response } from 'express';
const env = require('dotenv').config()
const db = require( './config/database' );
import { User } from './app/user/user.model';
import userController from "./app/user/user.controller";
const app: Application = express();
const port = 9000;


// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', userController.index)
app.get('/create', userController.create)



app.listen(port, () => {
    
// db.sync({ force: true }).then(() => {
 
//     console.log('connection to db')
// })

db.authenticate().then( async() => {
    try {
        console.log('db connection')
        await db.sync({ force: true });
    } catch (error:any) {
        console.log(error.message)
        
    }
}) 
    console.log(`Server is running on port ${port}`)
})
