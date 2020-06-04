
import {Website} from "../../../model";

export interface CrawlerService {
    execute(url:string): Promise<Website>
}
