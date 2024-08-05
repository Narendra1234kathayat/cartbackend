import mongoose from "mongoose";
import { dbName } from "../constant.js";

const connectDB=async()=>{
    try {
        const mongourl=process.env.url
        const mongooseconnection=await mongoose.connect(mongourl)
        console.log(mongooseconnection)
     

        
    } catch (error) {
        console.log(error)
        
    }

}
export default connectDB