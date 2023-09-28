import express from "express";
const app = express();
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import { dbConnect } from "./config/dbConnect.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoute.js";

dbConnect()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving static files
app.use(express.static('public'));

app.use(cookieParser())

// app.use('/',(req,res)=>{
//     res.send('here')
// })
app.use('/api/admin',adminRouter)
app.use('/api/users',userRouter)


//error handlers
app.use(notFound)
app.use(errorHandler)


app.listen(5000,()=>{
    console.log('server running')
})