import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'

const protectMessage = async (req, res, next) => {
    try {
        // ambil cookie jwt token
        const token = req.cookies.jwt

        if (!token) throw new Error('Unauthorized - No token provided.')

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (!decoded) throw new Error('Unauthorized - Invalid token.')

        const user = await User.findById(decoded.userId).select('-password')

        if (!user) throw new Error('User not found.')
        
        // assign into request var for function request controller
        req.user = user

        next()
    } catch (err) {
        console.log('Route protect has an error: ', err.message)
        return res.status(500).json({ message: err.message })
    }

}

export default protectMessage 