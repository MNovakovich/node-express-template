import "dotenv"
import express, { Application, Request, Response } from 'express';
import db from './config/database'
import { User } from './api/user/user.model';
const app: Application = express();
const port = 9000;


db.sync().then(() => {
    console.log('connection to db')
})
// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/create', async(req, res) => {
   try {
       const user  = await User.create({
           username:'marko',
           password:'123'
       })

       return res.status(200).send(user);
   } catch (error:any) {
       console.log(error.message, 'error')
   }
})
app.get('/', async(req:Request, res: Response): Promise<Response> => {
     return res.status(200).send({message:'hello baje'})
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
