import mongoose from "mongoose";
import { dbName } from "../constant.js";

const connectDB=async()=>{
    try {
        const mongourl=process.env.url
        const mongooseconnection=await mongoose.connect(`${mongourl}/${dbName}`)
        // console.log(mongooseconnection.owner)
     

        
    } catch (error) {
        console.log(error)
        
    }

}
export default connectDB