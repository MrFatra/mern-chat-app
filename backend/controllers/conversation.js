import { User } from "../models/user.js"

const onGetUserConversation = async (req, res) => {
    const { name: contactName } = req.params
    const senderId = req.user._id

    try {
        let user
        if (!contactName) {
            user = await User.find({ _id: { $ne: senderId } }).select('-password')
        } else {
            const regexContactName = new RegExp(contactName, 'i') // case insensitive search
            user = await User.find({
                _id: { $ne: senderId },
                fullName: { $regex: regexContactName }
            }).select('-password')
        }

        return res.status(200).json({ message: 'Conversation found', data: user })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ message: err.message })
    }
}

export default onGetUserConversation