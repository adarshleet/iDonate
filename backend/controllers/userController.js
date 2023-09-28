import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import bcrypt from 'bcrypt'
import generateToken from '../utilities/generateToken.js';


import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dfbyutwmz',
    api_key: '616888345499255',
    api_secret: 'n8GoExGOO1f4_Vp63f3KJoDC5CA'
});

//user signup
export const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    let image = req.file

    if (image) {
        const result = await cloudinary.uploader.upload(image.path)
        image = result.secure_url
    }

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
        res.json(user)
    }
});

//user login
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        const passwordCheck = await bcrypt.compare(password, user.password)
        // console.log(passwordCheck)
        if (passwordCheck) {
            generateToken(res, user._id,'user')
            res.status(200).json(user)
        }
        else {
            res.status(401).json('invalid email or password')
        }
    }
    else {
        res.status(401).json('invalid email or password')
    }
});

//user profile
export const userProfile = asyncHandler((req, res) => {
    const user = req.user
    res.send(user)
});

//user profile update
export const userProfileUpdate = asyncHandler(async (req, res) => {
    console.log(req.user._id);
    const user = await User.findById(req.user._id)
    const image = req.file

    if (user) {
        user.name = req.body.name || user.name
        // user.email = req.body.email || user.email

        if(req.body.email != user.email){
            const existingEmail = await User.findOne({email:req.body.email})
            if(existingEmail){
                return res.json({user:true})
            }
            else{
                user.email = req.body.email
            }
        }

        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            user.password = hashedPassword
        }

        if(image){
            let result = await cloudinary.uploader.upload(image.path)
            user.image = result.secure_url
        }
        else{
            user.image = user.image
        }
        await user.save();
        res.status(200).json(user)
    }
    else {
        res.status(402).json('user not found')
    }
});

//user logout
export const logout = asyncHandler((req, res) => {
    res.cookie('user', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.json('logged out')
});