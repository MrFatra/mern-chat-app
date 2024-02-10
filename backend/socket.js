import { Server } from 'socket.io'
import express from 'express'
import http from 'http'

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST']
    }
})

const usersSocketMap = {} // {userId: socketId}

export const getReceiverSocketId = (receiverId) => {
    return usersSocketMap[receiverId]
}

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId
    console.log('userId: ', userId)
    if (userId != 'undefined') usersSocketMap[userId] = socket.id
    io.emit('getOnlineUsers', Object.keys(usersSocketMap))
    console.log('A user has connected: ', socket.id)

    socket.on('disconnect', () => {
        delete usersSocketMap[userId]
        io.emit('getOnlineUsers', Object.keys(usersSocketMap))
        console.log('A user has diconnected: ', socket.id)
    })
})

export { app, io, server }

