import mongoose from "mongoose"

const connect = (server) => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('Database connected!')
        server.listen(process.env.PORT, () => console.log('Listening on', process.env.PORT))
    })
}

export default connect