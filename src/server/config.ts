import * as dotenv from 'dotenv';

dotenv.config();

const isTestEnvironment = process.env.NODE_ENV === 'test';

export interface Config {
    host: string;
    environment: string;
    port: string;
    db: {
        host: string,
        port: string,
        database: string
    };
}

export default {
    host: process.env.APP_HOST || '127.0.0.1',
    environment: process.env.NODE_ENV || 'development',
    port: process.env.APP_PORT || '3000',
    db: {
        host: (isTestEnvironment ? process.env.TEST_DB_HOST : process.env.DB_HOST),
        port: (isTestEnvironment ? process.env.TEST_DB_PORT : process.env.DB_PORT),
        database: (isTestEnvironment ? process.env.TEST_DB_NAME : process.env.DB_NAME),
    }
};
