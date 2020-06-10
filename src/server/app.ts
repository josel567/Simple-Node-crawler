import express, {Application as ExpressApp} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import config, {Config} from './config';
import {crawlerRoutes} from './http/routes';

export class Application {

    private readonly app: express.Application;
    private config: Config = config;

    public constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(crawlerRoutes);

        this.app.use((err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {

            console.error(err);

            res.sendStatus(500);

        });
    }

    public async startServer(): Promise<ExpressApp> {
        try {

            this.app.listen(this.config.port);
            console.log(`Server started at port ${this.config.port}`);

            await mongoose.connect(`mongodb://${this.config.db.host}:${this.config.db.port}/${this.config.db.database}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log(`Connected to mongoDB in ${this.config.db.database} database.`);

            return this.app;

        } catch (e) {
            console.log(e);
        }

    }

}
