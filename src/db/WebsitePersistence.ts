import {Website} from '../model';

export interface WebsitePersistence {
    createOrUpdate(url: string, level: number, links: String[]): Promise<any>;
    get(url: string): Promise<any>;
}
