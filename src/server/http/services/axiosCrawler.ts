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

        const startTime = new Date();

        const response = await axios.get(url);
        const $ = await cheerio.load(response.data);
        const linkTags = $('a');
        const links: Array<{anchor: string, href: string}> = [];

        await linkTags.each(async (i, link) => {

            if (link.attribs.href.startsWith('/')) {
                link.attribs.href = url + link.attribs.href;
            }

            links.push({
                anchor: link.children[0].data,
                href: link.attribs.href
            });

            try {
                await this.execute(link.attribs.href, level);
            } catch (e) {
                console.log(e);
            }

        });

        const finishTime = new Date();
        const time = Math.abs((startTime.getTime() - finishTime.getTime()) / 1000);

        return this.repository.createOrUpdate({url, level: 0, links, time});
    }

}
