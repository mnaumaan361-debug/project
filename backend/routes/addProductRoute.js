

import express from 'express'
import { addProduct, listProduct, removeProduct } from '../controllers/productController.js'
import uploadOnCloudinary from '../config/cloudinary.js'
import upload from '../midlewares/multer.js'
import adminAuth from '../midlewares/adminAuth.js'

const productRoutes=express.Router()

productRoutes.post('/addproduct',upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1},
    {name:"image4",maxCount:1} // ye 4 image cloudinary p pass kradi
]),addProduct)

productRoutes.get('/list',listProduct)
productRoutes.post('/remove/:id',adminAuth,removeProduct)

export default productRoutes