
import {Application as ExpressApp} from 'express';
import request from 'supertest';

import {Application} from '../../../src/server/app';


let app: ExpressApp;

describe('CrawlerController', () => {

    beforeAll(async () => {
        app = await new Application().startServer();
    });

    test('crawl', async () => {

        const response = await request(app).get('/crawl')
            .query({
                url: 'https://elpais.com',
                level: 2
            });

        expect(response.status).toBe(200);

    }, 20000000);

});
