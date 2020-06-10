import {AsyncRouter} from 'express-async-router';

import {CrawlerController} from '../controllers';
import {PersistenceFactory} from '../../db';

const persistenceFactory = new PersistenceFactory();
const websitePersistence = persistenceFactory.getWebsitePersistence();

const crawlerController = new CrawlerController(websitePersistence);

export const crawlerRoutes = AsyncRouter();

crawlerRoutes.get('/crawl', crawlerController.crawl);
