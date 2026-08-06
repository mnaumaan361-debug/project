
import express from "express"
import isAuth from "../midlewares/isAuth.js"
import { getAdmin,getCurrUser} from "../controllers/userController.js"
import adminAuth from "../midlewares/adminAuth.js"

let userRoutes=express.Router()

userRoutes.get('/getcurruser',isAuth,getCurrUser)
userRoutes.get('/getadmin',adminAuth,getAdmin)

export default userRoutes