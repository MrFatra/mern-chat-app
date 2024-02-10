import { Conversation } from '../models/conversation.js'
import { Message } from '../models/message.js'
import { getReceiverSocketId, io } from '../socket.js'

export const onSendMessage = async (req, res) => {
    const { id: receiverId } = req.params
    const { message } = req.body
    const senderId = req.user._id // get id from cookie token

    try {

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        await conversation.save()
        await newMessage.save()

        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage)
        }

        return res.status(200).json({ message: 'Message successfuly sent.', newMessage })

    } catch (err) {
        console.error('Message unsuccesfully sent: ', err.message)
        return res.status(500).json({ message: err.message })
    }

}

export const onGetMessage = async (req, res) => {
    try {
        const { id } = req.params
        const senderId = req.user._id

        if (!id) {
            throw new Error('No ID found!')
        }

        if (typeof id !== 'string') {
            throw new Error('Invalid ID format!')
        }

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, id] }
        }).populate('messages')

        if (!conversation) {
            throw new Error('No messages.')
        }

        const messages = conversation.messages

        return res.status(200).json({ message: 'Messages found!', messages })

    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ message: err.message, messages: [] })
    }
}
