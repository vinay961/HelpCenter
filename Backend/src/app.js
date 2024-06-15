import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from './router/user.route.js'
app.use('/api/users',userRouter)

import roomRouter from './router/room.route.js'
app.use('/api/rooms/',roomRouter)

export {app}
