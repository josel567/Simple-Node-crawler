
import {Website} from '../../../../model';

export interface CrawlerService {
    execute(url: string, level: number): Promise<Website>;
}
