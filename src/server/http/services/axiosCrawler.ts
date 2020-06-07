import {CrawlerService} from './types';
import axios from 'axios';
import cheerio from 'cheerio';
import {Website} from '../../../model';
import {WebsitePersistence} from '../../db';

export class AxiosCrawler implements CrawlerService {
    private repository: WebsitePersistence;

    public constructor(repository: WebsitePersistence) {
        this.repository = repository;
    }

    public async execute(url: string, level: number): Promise<Website> {

        const response = await axios.get(url);
        const $ = await cheerio.load(response.data);
        const linkTags = $('a');
        const links: Array<{
            anchor: string,
            href: string
        }> = [];

        await linkTags.each((i, link) => {
            links.push({
                anchor: link.children[0].data,
                href: link.attribs.href
            });
        });

        return this.repository.createOrUpdate(url, 0, links);
    }

}
