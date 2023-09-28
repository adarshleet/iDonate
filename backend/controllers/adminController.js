import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModel.js'
import User from '../models/userModel.js';
import bcrypt from 'bcrypt'
import generateToken from '../utilities/generateToken.js';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dfbyutwmz',
    api_key: '616888345499255',
    api_secret: 'n8GoExGOO1f4_Vp63f3KJoDC5CA'
});

//admin login
export const adminLogin = asyncHandler(async(req,res)=>{
    const {email,password} = req.body

    const adminFound = await Admin.findOne({email})

    if(adminFound){
        const passwordCheck = await bcrypt.compare(password,adminFound.password)
        if(passwordCheck){
            generateToken(res, adminFound._id,'admin')
            res.status(200).json(adminFound)
        }
        else{
            res.status(401).json('invalid admin credentials')
        }
    }
    else{
        res.status(401).json('invalid admin credentials')
    }
})


export const userUpdate = asyncHandler(async(req,res)=>{
    const userId = req.query.userId
    const user = await User.findById({_id:userId})
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            user.password = hashedPassword
        }
        await user.save();
        res.status(200).json(user)
    }
})


export const userDelete = asyncHandler(async(req,res)=>{
    const userId = req.query.userId
    
    const user = await User.findById({_id:userId})
    if(user){
        await User.deleteOne({_id:userId})
        res.status(200).json('user deleted')
    }
    else{
        res.status(401).json('something went wrong')
    }
})

export const getUserdata = asyncHandler(async(req,res)=>{
    const search = req.query.search || ''
    const userData = await User.find({$or: [
        { name: { $regex: '^'+search, $options: 'i' } },
        { email: { $regex: '^'+search, $options: 'i' } }
    ]})
    res.status(200).json(userData)
})

export const singleUser = asyncHandler(async(req,res)=>{
    const userId = req.params.userId
    if(userId){
        const user = await User.findById({_id:userId})
        res.status(200).json(user)
    }
})


export const createUser = asyncHandler(async(req,res)=>{
    const { name, email, password } = req.body
    let image = req.file

    if (image) {
        const result = await cloudinary.uploader.upload(image.path)
        image = result.secure_url
    }

    console.log(image);
    
    const userFound = await User.findOne({ email })
    if (userFound) {
        return res.json({ user: true })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        image
    })
    if (user) {
        // generateToken(res, user._id)
        res.json('user created')
    }
}) 



//admin logout
export const logout = asyncHandler((req, res) => {
    res.cookie('admin', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.json('admin logged out')
});