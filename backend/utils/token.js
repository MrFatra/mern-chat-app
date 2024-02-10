import jwt from 'jsonwebtoken'

const generateJWTNSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d',
    })

    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // ms
        httpOnly: true, //  prevent client access to the cookie or XSS
        sameSite: 'strict', // CSRF protection
        secure: process.env.NODE_ENV !== 'development'
    })
}

export default generateJWTNSetCookie