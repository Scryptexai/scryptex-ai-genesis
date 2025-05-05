import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import analyzeRoutes from './routes/analyze';
import airdropRoutes from './routes/airdrop';
import creditRoutes from './routes/credit';
import referralRoutes from './routes/referral';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/analyze', analyzeRoutes);
app.use('/api/airdrop', airdropRoutes);
app.use('/api/credit', creditRoutes);
app.use('/api/referral', referralRoutes);

export default app;
