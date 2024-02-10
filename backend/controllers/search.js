import { User } from "../models/user.js"

const onSearch = async (req, res) => {
    const { name: contactName } = req.params
    const senderId = req.user._id

    try {
        let user
        if (senderId == null) {
            user = await User.find({ fullName: contactName }).select('-password')

        } else {
            user = await User.find({ _id: { $ne: senderId } }).select('-password')
        }

        return res.status(200).json({ message: 'Conversation found', data: user })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ message: err.message })
    }
}

export default onSearch