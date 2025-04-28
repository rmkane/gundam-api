/* eslint-disable no-console */
import { createServer } from 'http'

import { Server } from 'socket.io'

let io: Server

export const initializeSocket = () => {
  const httpServer = createServer()
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
    })
  })

  const port = parseInt(process.env.WS_PORT || '3001', 10)
  httpServer.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`)
  })

  return io
}

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized')
  }
  return io
}
