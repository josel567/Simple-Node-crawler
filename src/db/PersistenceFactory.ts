import {WebsitePersistence} from "./WebsitePersistence";
import {WebsiteMongoosePersistence} from "./mongoose";


export class PersistenceFactory {

    public getWebsitePersistence(): WebsitePersistence {
        return new WebsiteMongoosePersistence();
    }
}
