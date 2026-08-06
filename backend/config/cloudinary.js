import { v2 as cloudinary } from "cloudinary";

const uploadOnCloudinary = async (fileBuffer) => {

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


  try {

    const uploadResult = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${fileBuffer.toString("base64")}`
    );

    return uploadResult.secure_url;


  } catch(error){

    console.log(error);
    return null;

  }

}


export default uploadOnCloudinary;