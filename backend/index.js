import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import connect from './config.js'
import messageRoutes from './routes/message.js'
import cookieParser from 'cookie-parser'
import { app, server } from './socket.js'

dotenv.config({ path: './backend/.env' })

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connect(server)

app.use('/api/auth', authRoutes)
app.use('/api/message/', messageRoutes)
app.use('/api/user', userRoutes)
