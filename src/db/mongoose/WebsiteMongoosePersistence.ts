
import {Website} from '../../model'
import {WebsitePersistence} from "../WebsitePersistence";
import * as mongoose from "mongoose";

export class WebsiteMongoosePersistence implements WebsitePersistence{

    private model: any;

    constructor() {
        this.model = mongoose.model('website', Website);
    }

    public async createOrUpdate(url: string, level: number, links: String[]): Promise<any> {
        return this.model.updateOne({url},{
            url,
            level,
            links
        }, {upsert: true});
    }

    public async get(url: string): Promise<any> {
        return this.model.findOne({url});
    }

}
