import axios, {AxiosResponse} from 'axios';
import cheerio from 'cheerio';

import {WebsitePersistence} from '../../db';
import {Website} from '../../../model';
import {CrawlerService} from './types';

export class AxiosCrawler implements CrawlerService {
    private repository: WebsitePersistence;
    private links: Array<{anchor: string, href: string}> = [];
    private scrapedLinks: string[] = [];

    public constructor(repository: WebsitePersistence) {
        this.repository = repository;
    }

    public async execute(url: string, level: number): Promise<Website> {

        await this.scrapLink(url, level);

        return this.repository.createOrUpdate({url, level, links: this.links});

    }

    private filterInternalLinks(url: string, links: Array<{anchor: string, href: string}>): Array<{anchor: string, href: string}> {
        return links.filter((link: {anchor: string, href: string}) => link.href.startsWith(url));
    }

    private async extractLinksFromTags(url: string, response: AxiosResponse): Promise<Array<{anchor: string, href: string}>> {

        const links: Array<{anchor: string, href: string}> = [];
        const $ = await cheerio.load(response.data);
        const linkTags: Cheerio = $('a');

        linkTags.each((i: number, link: CheerioElement) => {

            if(link.attribs.href) {

                if (link.attribs.href.startsWith('/')) {
                    link.attribs.href = url + link.attribs.href;
                }

                links.push({
                    anchor: link.children[0].data,
                    href: link.attribs.href
                });

            }

        });

        return links;

    }

    private async scrapLink(url: string, level: number): Promise<void> {

        if(!this.scrapedLinks.includes(url)) {

            this.scrapedLinks.push(url);
            const response = await axios.get(url);
            const currentPageLinks: Array<{anchor: string, href: string}> = await this.extractLinksFromTags(url, response);
            const internalLinks: Array<{anchor: string, href: string}> = this.filterInternalLinks(url, currentPageLinks);

            for (const link of internalLinks) {

                this.links.push({
                    anchor: link.anchor,
                    href: link.href
                });

                this.scrapedLinks.push(link.href);

                await this.scrapLink(link.href, level);

            }

        }

    }

}
