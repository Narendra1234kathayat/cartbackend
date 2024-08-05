import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model.js";

const Authmiddleware =async(req,res,next)=>{
    try {
        const token=req.header?.AuthToken;
        if(!token){
            return res.status(400).json({error:"token not found "})
        }
        const decodedtoken=await jwt.verify(token,process.env.jwt_secret)
        if(!decodedtoken){
            throw new ApiError(400,"NO token found")
        }
        const user=await User.findById(decodedtoken?._id).select("-password")
        if(!user){
            throw new ApiError(400,"user not founded")
        }
        req.user=user;
        next();
    } catch (error) {
        throw new ApiError(500,"SOMEThing went wrong")
        
    }
}
export {Authmiddleware}