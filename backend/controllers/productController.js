import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
    
  try {
    
console.log("FILES:", req.files)
    console.log("BODY:", req.body)
    const {
      name,
      description,
      category,
      subCategory,
      price,
      sizes,
      bestseller,
    } = req.body;

    // Upload images to Cloudinary
    const image1 = await uploadOnCloudinary(req.files.image1[0].buffer);
const image2 = await uploadOnCloudinary(req.files.image2[0].buffer);
const image3 = await uploadOnCloudinary(req.files.image3[0].buffer);
const image4 = await uploadOnCloudinary(req.files.image4[0].buffer);

    const productData = {
      name,
      description,
      image1,
      image2,
      image3,
      image4,
      category,
      subCategory,
      date: Date.now(),
      price: Number(price),
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true",
    };
    const product = await Product.create(productData);

    return res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log("Add Product Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//read product

export const listProduct=async(req,res)=>{
  try {
    const product=await Product.find({})
    return res.status(200).json(product)
  } catch (error) {
    console.log("list product error")
    return res.status(500).json({msg:`list product error ${error}`})
  }
}

// delete product

export const removeProduct=async(req,res)=>{
  try {
    let {id}=req.params
    const product=await Product.findByIdAndDelete(id)
     return res.status(200).json({msg:"product deleted succesfully"})
  } catch (error) {
    console.log("remove product error")
    return res.status(500).json({msg:`Remove Product Error ${error}`})
  }
}