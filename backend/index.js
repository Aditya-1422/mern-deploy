import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import authRouter from './router/authRouter.js'
import userRouter from './router/userRouter.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'

dotenv.config({path:'./backend/config.env'})
const app = express();

const connectDb = () =>{
    mongoose.connect("mongodb+srv://adityaozalwarcnp:adityadb@project1.utbffbn.mongodb.net/?retryWrites=true&w=majority&appName=Project1").then(()=>{
        console.log(`Connected to DB!!`)
    }).catch((err)=>{
        err
    })
}

app.listen(4000,()=>{
    connectDb();
    console.log(`Server is working : ${process.env.PORT}`)
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use('/',(req,res)=>{
    res.send("Server is wokring")
})

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})