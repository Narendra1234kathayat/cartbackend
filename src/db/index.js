import mongoose from "mongoose";
import { dbName } from "../constant.js";

const connectDB=async()=>{
    try {
        const mongooseconnection=await mongoose.connect(`${process.env.url}/${dbName}`)
     

        
    } catch (error) {
        console.log(error)
        
    }

}
export default connectDB