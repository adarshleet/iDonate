import express from 'express'
const userRouter = express.Router()
import { signup,login,userProfile,userProfileUpdate,logout } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/multerMiddleware.js'

userRouter.post('/signup',upload.single('image'),signup)

userRouter.post('/login',login)

userRouter.get('/profile',protect,userProfile)

userRouter.put('/profile',upload.single('image'),protect,userProfileUpdate)

userRouter.post('/logout',logout)

export default userRouter