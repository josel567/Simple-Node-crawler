import {Website} from '../../model';

export interface WebsitePersistence {
    createOrUpdate(website: Website): Promise<Website>;
    get(url: string): Promise<Website>;
}
