import 'dotenv';
import 'reflect-metadata';
import express, { Application } from 'express';
const env = require('dotenv').config();
const db = require('./config/database');
import { DbRelations } from './config/relations';
import routes from './routes';
import { notFoundMiddleware } from './middleware/not-found';
import { errorHandlerMiddleware } from './middleware/errror-handler';
const app: Application = express();
const port = 9900;

// Body parsing Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', routes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  db.authenticate().then(async () => {
    try {
      console.log('db connection');
      await db.sync({ force: false });
      DbRelations(db.models);
    } catch (error: any) {
      console.log(error.message, '-error server.ts');
    }
  });
  console.log(`Server is running on port ${port}`);
});
