const onLogOut = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 })
        return res.status(200).json({ message: 'Successfully logged out' })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ message: 'Logout failed!' })
    }
}

export default onLogOut