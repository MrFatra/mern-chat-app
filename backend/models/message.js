import mongoose, { Schema } from 'mongoose'
const messageSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
}, { timestamps: true })

export const Message = mongoose.model('messages', messageSchema)