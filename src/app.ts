import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from "body-parser";
import config from './config';

export class Application {

    app: express.Application;
    config = config;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    async startServer(): Promise<void> {
        try {

            this.app.listen(this.config.port);
            console.log(`Server started at port ${this.config.port}`);

            await mongoose.connect(`mongodb://${this.config.db.host}:${this.config.db.port}/${this.config.db.database}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log(`Connected to mongoDB in ${this.config.db.database} database.`);

        } catch (e) {
            console.log(e);
        }

    }

}
