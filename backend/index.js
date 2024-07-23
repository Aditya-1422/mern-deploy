import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './router/authRouter.js';
import userRouter from './router/userRouter.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config({ path: './backend/config.env' });

const app = express();

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to DB!');
        })
        .catch(err => {
            console.error('DB connection error:', err);
        });
};

app.listen(4000, () => {
    connectDb();
    console.log('Server is running on port 4000');
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: ["https://mern-deploy-frontend-pi.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/', (req, res) => {
    res.send('Server is working');
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error('Error:', message);
    res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
});

// Logging request headers for debugging
app.use((req, res, next) => {
    console.log('Request Headers:', req.headers);
    next();
});