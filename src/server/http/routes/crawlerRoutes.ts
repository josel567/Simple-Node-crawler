import {AsyncRouter} from 'express-async-router';
import {CrawlerController} from '../controllers';
import {AxiosCrawler} from "../services";
import {PersistenceFactory} from "../../db";

const persistenceFactory = new PersistenceFactory();
const websitePersistence = persistenceFactory.getWebsitePersistence();

const axiosCrawler = new AxiosCrawler(websitePersistence);
const crawlerController = new CrawlerController(axiosCrawler);

export const crawlerRoutes = AsyncRouter();

crawlerRoutes.get('/crawl', crawlerController.crawl);
