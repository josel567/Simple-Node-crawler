import express from 'express';

import {AxiosCrawler} from '../services';
import {WebsitePersistence} from '../../db';

export class CrawlerController {

    private readonly persistence: WebsitePersistence;

    public constructor(persistence: WebsitePersistence) {
        this.persistence = persistence;
        this.crawl = this.crawl.bind(this);
    }

    public async crawl(req: express.Request, res: express.Response): Promise<void> {

        const {url, level} = req.query;

        if(typeof url === 'string' && typeof level === 'string') {

            const crawler = new AxiosCrawler(this.persistence, +level, url);
            const results = await crawler.execute(url);
            res.json(results);

        } else {
            res.status(500);
        }

    }

}
