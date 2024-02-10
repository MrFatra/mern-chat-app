import mongoose, { Schema } from 'mongoose'

const conversationSchema = new Schema({
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'messages',
            default: [],
        },
    ],
}, { timestamps: true })

export const Conversation = mongoose.model('conversations', conversationSchema)