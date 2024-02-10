import { User } from "../models/user.js"
import bcrypt from 'bcryptjs'
import generateJWTNSetCookie from "../utils/token.js"

const onLogin = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })

        if (!user) throw new Error('Invalid username or password.')

        const validPass = await bcrypt.compare(password, user.password)

        if (!validPass) throw new Error('Invalid username or password.')

        generateJWTNSetCookie(user._id, res)

        return res.status(200).json({ message: `Authenticated as ${user.username}`, data: user })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ message: err.message })
    }
}

export default onLogin