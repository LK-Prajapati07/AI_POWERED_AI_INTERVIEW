import express from 'express'
import { ENV } from './src/config/env.js'
import dotenv from 'dotenv'
import { connectDb } from './src/config/DB.js';
import authRoutes from  './src/routes/auth.route.js'
import Paymentrouter from './src/routes/payment.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import interviewRouter from './src/routes/interview.route.js';
dotenv.config();
const app=express()
app.set("etag", false);
app.use(express.json());
app.use(
  cors({
    // origin:true,
    origin: process.env.CLIENT_URL
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use('/api/interview',interviewRouter)
app.use("/api/payment", Paymentrouter)

app.get('/',(req,res)=>{
    res.send("APP is READY")
})
app.listen(ENV.PORT,()=>{
    console.log(`Server is running on port http://localhost:${ENV.PORT}`);
    connectDb()
})
