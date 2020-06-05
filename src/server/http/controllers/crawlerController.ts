import express from 'express';
import {CrawlerService} from '../services/types';

export class CrawlerController {
    private crawler: CrawlerService;

    public constructor(crawler: CrawlerService) {
        this.crawler = crawler;
        this.crawl = this.crawl.bind(this);
    }

    public async crawl(req: express.Request, res: express.Response): Promise<void> {

        const {url, level} = req.query;

        if(typeof url === 'string' && typeof level === 'string') {
            const results = await this.crawler.execute(url, +level);
            res.json(results);
        } else {
            res.status(500);
        }

    }

}
