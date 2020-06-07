
import {WebsiteSchema} from '../../model';
import {Website} from '../../../model';
import {WebsitePersistence} from '../WebsitePersistence';
import * as mongoose from 'mongoose';

export class WebsiteMongoosePersistence implements WebsitePersistence {

    private model: mongoose.Model<mongoose.Document & Website>;

    public constructor() {
        this.model = mongoose.model('website', WebsiteSchema);
    }

    public async createOrUpdate(url: string, level: number, links: Array<{anchor: string, href: string}>): Promise<Website> {
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
