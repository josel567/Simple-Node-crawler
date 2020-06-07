import {Website} from '../../model';

export interface WebsitePersistence {
    createOrUpdate(url: string, level: number, links: Array<{anchor: string, href: string }>): Promise<Website>;
    get(url: string): Promise<Website>;
}
