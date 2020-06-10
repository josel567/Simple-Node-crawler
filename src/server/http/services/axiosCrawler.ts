
import axios, {AxiosResponse} from 'axios';
import cheerio from 'cheerio';

import {WebsitePersistence} from '../../db';
import {Website} from '../../../model';
import {CrawlerService} from './types';

export class AxiosCrawler implements CrawlerService {

    private repository: WebsitePersistence;
    private links: Array<{anchor: string, href: string}> = [];
    private scrapedLinks: string[] = [];
    private readonly limitLevel: number;
    private readonly baseUrl: string;

    public constructor(repository: WebsitePersistence, limitLevel: number, baseUrl: string) {
        this.repository = repository;
        this.limitLevel = limitLevel;
        this.baseUrl = baseUrl;
    }

    public async execute(url: string): Promise<Website> {

        await this.scrapLink(url);

        return this.repository.createOrUpdate({url, links: this.links});

    }

    private async scrapLink(url: string, level: number = 0): Promise<void> {

        const sanitizedUrl = this.sanitizeUrl(url);

        if(level === this.limitLevel) {
            return;
        }

        if(!this.scrapedLinks.includes(sanitizedUrl)) {

            console.log(` -----------------> Start scrapping ${sanitizedUrl}`);

            this.scrapedLinks.push(sanitizedUrl);

            try {
                const response = await axios.get(sanitizedUrl);

                const currentPageLinks: Array<{anchor: string, href: string}> = await this.extractLinksFromTags(sanitizedUrl, response);
                const internalLinks: Array<{anchor: string, href: string}> = await  this.filterInternalLinks(currentPageLinks);

                for (const link of internalLinks) {

                    if(!this.links.find(l => l.href === link.href)) {
                        this.links.push(link);
                    }

                    await this.scrapLink(link.href, level + 1);

                }
            } catch(e) {
                console.error(e);
            }

        }

        return;

    }

    private filterInternalLinks(links: Array<{anchor: string, href: string}>): Array<{anchor: string, href: string}> {
        return links.filter((link: {anchor: string, href: string}) => link.href.startsWith(this.baseUrl));
    }

    private async extractLinksFromTags(url: string, response: AxiosResponse): Promise<Array<{anchor: string, href: string}>> {

        const links: Array<{anchor: string, href: string}> = [];
        const $ = await cheerio.load(response.data);
        const linkTags: Cheerio = $('a');

        linkTags.each((i: number, link: CheerioElement) => {

            if(link.attribs.href) {

                // Removing relative links
                if (link.attribs.href.startsWith('/') && link.attribs.href.indexOf(this.baseUrl) === -1) {
                    link.attribs.href = url + link.attribs.href;
                }

                // Removing slash at the first character
                if (link.attribs.href.startsWith('/') && link.attribs.href.indexOf(this.baseUrl) !== -1) {
                    link.attribs.href = link.attribs.href.slice(1);
                }

                // Removing special links
                if(link.attribs.href.startsWith('#')) {
                    return;
                }

                links.push({
                    anchor: link.children[0] ? link.children[0].data : '',
                    href: link.attribs.href
                });

            }

        });

        return links;

    }


    private sanitizeUrl(url: string): string {

        if(url.endsWith('/')) {
           return url.slice(0, -1);
        }

        return url;
    }
}
