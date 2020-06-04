import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const Website = new Schema({
    id: Schema.Types.ObjectId,
    url: {type: String, required: true, unique: true},
    links: [String],
    level: Number
});
