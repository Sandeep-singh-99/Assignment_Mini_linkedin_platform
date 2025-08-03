import { model, Schema } from 'mongoose';

const feedSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },

    content: {
        type: String,
        required: true
    },

    
}, {timestamps: true });

export const Feed = model('Feed', feedSchema);