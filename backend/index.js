import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import connect from './config.js'
import messageRoutes from './routes/message.js'
import cookieParser from 'cookie-parser'
import { app, server } from './socket.js'
import path from 'path'

dotenv.config({ path: './backend/.env' })

const __dirname = path.resolve()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connect(server)

app.use('/api/auth', authRoutes)
app.use('/api/message/', messageRoutes)
app.use('/api/user', userRoutes)

// static files
app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})