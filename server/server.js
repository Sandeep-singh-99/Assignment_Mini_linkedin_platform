import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';

import { ConnectDB } from './config/db.js';
import authRoutes from './routes/auth.route.js';
import feedRoutes from './routes/feed.route.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/feed', feedRoutes);

app.listen(PORT, () => {
    ConnectDB();
    console.log(`Server is running on port http://localhost:${PORT}`);
})