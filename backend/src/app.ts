import express from 'express'
import morgan from 'morgan'
import appRoutes from './routes/index.js';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
config();
const app=express();
// app.get('/')
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET))
// remove in production
app.use(morgan('dev'))

app.use('/api/v1',appRoutes)
export default app;