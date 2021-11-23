import 'dotenv';
import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
const env = require('dotenv').config();
const db = require('./config/database');

import routes from './routes';
import bootstrap from './bootstrap';
// import postController from './app/posts/post.controler';
const app: Application = express();
const port = 9900;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

//app.use('/', bootstrap.router);
app.listen(port, () => {
  db.authenticate().then(async () => {
    try {
      console.log('db connection');
      await db.sync({ force: false });
    } catch (error: any) {
      console.log(error.message, '-error server.ts');
    }
  });
  console.log(`Server is running on port ${port}`);
});
