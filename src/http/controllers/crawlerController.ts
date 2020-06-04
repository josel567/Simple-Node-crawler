import express from 'express';
import {CrawlerService} from '../services/types';

export class CrawlerController {
    private crawler: CrawlerService;

    constructor(crawler: CrawlerService) {
        this.crawler = crawler;
        this.crawl = this.crawl.bind(this);
    }

    async crawl(req: express.Request, res: express.Response) {

        const url = req.query.url;

        if(typeof url === 'string') {
            const results = await this.crawler.execute(url);
            res.json(results);
        } else {
            res.status(500);
        }

    }

}
