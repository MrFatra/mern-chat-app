import { User } from "../models/user.js"
import bcrypt from 'bcryptjs'
import generateJWTNSetCookie from '../utils/token.js'

const onSignUp = async (req, res) => {
    const { fullName, username, password, confirmPassword, gender } = req.body

    try {
        if (password !== confirmPassword) throw new Error('Password doesn\'t match.')

        const user = await User.findOne({ username: username })

        if (user) throw new Error('Username already exist.')

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const result = new User({
            fullName,
            username,
            password: hashedPass,
            gender,
            profilePic: gender === 'male' ? boyPic : girlPic
        })

        if (!result) throw new Error('Invalid user data.')
        
        generateJWTNSetCookie(result._id, res)
        const data = await result.save()

        return res.status(200).json({ message: 'New User added!', data })

    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ message: err.message })
    }
}

export default onSignUp