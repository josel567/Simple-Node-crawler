import {CrawlerService} from "./types";
import axios from 'axios';
import cheerio from 'cheerio';
import {Website} from "../../model";
import {WebsitePersistence} from "../../db";

export class AxiosCrawler implements CrawlerService{
    private repository: WebsitePersistence;

    constructor(repository: WebsitePersistence) {
        this.repository = repository;
    }

    async execute(url: string): Promise<typeof Website> {

        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const linkTags = $('a');
        const links: string[] = [];

        await linkTags.each((i,link) => {
            links.push($('link').attr('href'));
        });

        return this.repository.createOrUpdate(url, 0, links);
    }

}
