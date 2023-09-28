import express from 'express'
const adminRouter = express.Router()
import { adminLogin , userUpdate , userDelete ,logout , getUserdata, singleUser, createUser} from '../controllers/adminController.js'
import { upload } from '../middleware/multerMiddleware.js'
import { protectAdmin } from '../middleware/adminAuthMiddleware.js'

adminRouter.post('/login',adminLogin)

adminRouter.put('/updateUser',protectAdmin,userUpdate)

adminRouter.delete('/deleteUser',protectAdmin,userDelete)

adminRouter.get('/getUserData',protectAdmin,getUserdata)

adminRouter.get('/updateUser/:userId',protectAdmin,singleUser)

adminRouter.post('/createUser',protectAdmin,upload.single('image'),createUser)

adminRouter.post('/logout',protectAdmin,logout)


export default adminRouter 