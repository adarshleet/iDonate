import mongoose from "mongoose";

export const dbConnect = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to mongoDb');
    } catch (error) {
        console.log(error.message)
    }
}