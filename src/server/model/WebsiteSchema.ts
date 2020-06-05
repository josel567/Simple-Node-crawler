import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const WebsiteSchema = new Schema({
    url: {type: String, required: true, unique: true},
    links: [String],
    level: Number
});
