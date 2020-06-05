import {Website} from '../../model';

export interface WebsitePersistence {
    createOrUpdate(url: string, level: number, links: string[]): Promise<Website>;
    get(url: string): Promise<Website>;
}
