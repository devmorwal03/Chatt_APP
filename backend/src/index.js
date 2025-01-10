import express from 'express';
import authRoutes from './routes/auth.routh.js';
import { connectDB } from './lib/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';

dotenv.config();    // to read .env file


const app = express();
const PORT = process.env.PORT; 

app.use(express.json());
app.use(cookieParser());        // to support cookie parsing

app.use("/api/auth", authRoutes);   
app.use("/api/message", messageRoutes)   // use message routes
app.use(cors({
    origin: "hhtp://localhost:5173",
    credentials: true
}))


app.listen(PORT, () => {
    console.log('Server is running on port:' + PORT)        
    connectDB();
});