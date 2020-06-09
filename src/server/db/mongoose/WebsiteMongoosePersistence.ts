import * as mongoose from 'mongoose';

import {WebsitePersistence} from '../WebsitePersistence';
import {WebsiteSchema} from '../../model';
import {Website} from '../../../model';

export class WebsiteMongoosePersistence implements WebsitePersistence {
    private model: mongoose.Model<mongoose.Document & Website>;

    public constructor() {
        this.model = mongoose.model('website', WebsiteSchema);
    }

    public async createOrUpdate(website: Website): Promise<Website> {

        const {url, level, links} = website;

        return this.model.findOneAndUpdate({url}, {
            url,
            level,
            links
        }, {
            new: true,
            upsert: true
        });

    }

    public async get(url: string): Promise<Website> {
        return this.model.findOne({url});
    }

}
