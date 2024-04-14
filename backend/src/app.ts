import express from 'express'
import morgan from 'morgan'
import appRoutes from './routes/index.js';

const app=express();
// app.get('/')
app.use(express.json());
// remove in production
app.use(morgan('dev'))

app.use('/api/v1',appRoutes)
export default app;