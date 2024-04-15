import express from 'express';
import morgan from 'morgan';
import appRoutes from './routes/index.js';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import dotenv from 'dotenv';
dotenv.config();
config();
const app = express();
// app.get('/')
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// remove in production
app.use(morgan('dev'));
app.use('/api/v1', appRoutes);
export default app;
//# sourceMappingURL=app.js.map