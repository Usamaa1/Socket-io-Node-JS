import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

import database from './config/config.mjs'
import userRouter from './routes/authRoutes.mjs'
import authMiddleware from './controllers/middleware/authMiddleware.mjs'
import chatRouter from './routes/chatRoutes.mjs'

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true
  }
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your React app's URL
  credentials: true // <-- This is required to allow cookies
}))
const port = 3000


io.on('connection',(socket)=>{


    
    console.log(`A user connected with user Id: ${userId}: `, socket.id);


  socket.on("sendMessage", (messageData)=>{


    io.emit('receiveMessage',messageData);
  })

  socket.on("disconnect",()=>{
    console.log('A user disconnected');
  })
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/v1',userRouter);

app.get('/dashboard', authMiddleware, (req, res) => {
  res.send(`Welcome user ${req.user.email}`);
});

app.use('/api/v1',chatRouter);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
