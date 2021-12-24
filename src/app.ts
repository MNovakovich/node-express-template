import 'dotenv';
import 'reflect-metadata';
import express, { Application } from 'express';
import cors from 'cors';
const env = require('dotenv').config();
import db from './config/database';
import { DbRelations } from './config/relations';
import routes from './routes';
import { notFoundMiddleware } from './middleware/not-found.middleware';
import { errorHandlerMiddleware } from './middleware/errror.middleware';
import { paginateFilterUrl } from './core/paginationAndFilteringDecorator';
import autoRun from './sequelize-auto';
//autoRun();
export class App {
  public port: string | number;
  public env: string;
  public app: Application;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 9900;
    this.env = process.env.NODE_ENV || 'development';
    this.connectToDatabase();
    this.initializeMiddlewares();
  }
  connectToDatabase() {
    db.authenticate().then(async () => {
      try {
        console.log('db connection');
        await db.sync({ force: false });
        DbRelations(db.models);
        paginateFilterUrl.setModels(db.models);
      } catch (error: any) {
        console.log(error.message, '-error server.ts');
      }
    });
    console.log(`Server is running on port ${this.port}`);
  }
  private initializeMiddlewares() {
    // Body parsing Middleware
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use('/', routes);
    this.app.use(notFoundMiddleware);
    this.app.use(errorHandlerMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`application running on port" ${this.port}`);
    });
    // this.app.listen(this.port, () => {
    //   logger.info(`=================================`);
    //   logger.info(`======= ENV: ${this.env} =======`);
    //   logger.info(`🚀 App listening on the port ${this.port}`);
    //   logger.info(`=================================`);
    // });
  }
}

export default App;
