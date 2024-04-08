import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser';
import socialRouter from './controllers/social.controller.js'
dotenv.config()

const app = express()

app.use(cookieParser())
app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/api/user', userRouter);
app.use('/api/social',socialRouter)



export default app;