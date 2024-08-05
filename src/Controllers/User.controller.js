import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";



export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
         return res.status(400).json(new ApiError(400,"username and password are required"));
      }
    const finduser=await User.findOne({username})
    if(!finduser){
        return res.status(400).json( new ApiError(400,"user not found"))
        
    }
    // console.log(finduser);

    const passwordcorrect=await finduser.isCorrectPassword(password)
    
    if(!passwordcorrect){
        return res.status(500).json({error:"password incorrect"})
    }
    
    const token=await finduser.generateToken(finduser._id)
    if(!token){
      return res.status(401).json(new ApiError(400,"token not created"))
      
    }
    // console.log(token)
    
    return res.status(200).json({finduser,token});
    
    

  } catch (error) {
    
    // return res.status(500).json({error})
    return res.status(500).json(new ApiError(500,error));
    // throw new ApiError(400,"username and password are required");
  }
};
export const signup = async (req, res) => {
    try {
      const { username, password,email } = req.body;
      console.log("hello", username, password,email);
      
      if (!username || !password || !email) {
        return res.status(400).json({ error: "Username and password are required" });
      }
      
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      const profilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    //   console.log(profilepic);
  
      const user = new User({
        username,
        password,
        profile: profilepic,
        email
      });
  
      await user.save();
      // console.log(user);
  
      return res.status(200).json({ success: true });
    } catch (error) {
      // console.log(error.message);
      return res.status(500).json({ error: "Server error" });
    }
  };
  
  
export const logout = async (req, res) => {
  try {
   


  } catch (error) {
    res.status(500).json({ error: error });
  }
};
