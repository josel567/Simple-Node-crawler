import mongoose, {Mongoose} from 'mongoose';

import config from '../../../src/server/config';
import {AxiosCrawler} from '../../../src/server/http/services';
import {WebsiteMongoosePersistence} from '../../../src/server/db';
import {Website} from '../../../src/model';

describe('AxiosCrawler', () => {

    let db: Mongoose;
    const url = 'https://www.nnergix.com/';
    const repository: WebsiteMongoosePersistence = new WebsiteMongoosePersistence();
    const axiosCrawler = new AxiosCrawler(repository, 2, url);

    beforeAll(async () => {

        db = await mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.database}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`Conected to ${config.db.database} database.`);

    });

    afterAll(async () => {
        await db.connection.db.dropDatabase();
    });

    test('crawl', async () => {

        const website: Website = await axiosCrawler.execute(url);
        const document = await repository.get(website.url);

        expect(website.url).toEqual(url);
        expect(document.url).toEqual(url);

    }, 50000);

});
