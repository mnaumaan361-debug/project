import mongoose from "mongoose";

const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('db connected bhai')
    }
    catch(error){
        console.log(`errod h ${error}`)
    }
}
export default connectdb