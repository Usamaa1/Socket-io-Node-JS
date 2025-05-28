import express from 'express'
import database from './config/config.mjs'
import userRouter from './routes/authRoutes.mjs'
import cookieParser from 'cookie-parser'
import authMiddleware from './controllers/middleware/authMiddleware.mjs'
import chatRouter from './routes/chatRoutes.mjs'
import cors from 'cors';
const app = express()
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your React app's URL
  credentials: true // <-- This is required to allow cookies
}))
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/v1',userRouter);

app.get('/dashboard', authMiddleware, (req, res) => {
  res.send(`Welcome user ${req.user.email}`);
});

app.use('/api/v1',chatRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
