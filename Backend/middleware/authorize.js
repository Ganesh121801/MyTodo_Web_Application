import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

export const authenticate = async (req , res , next) =>{
    const token = req.cookies.jwt ;
    if(!token){
        return res.status(401).json({msg:"You are not authenticated"})
    }
    try {
       const decoded =  jwt.verify(token , process.env.JWT_SECRET_KEY)
       console.log(decoded);
     req.user = await User.findById(decoded.userId);
    } catch (error) {
        return res.status(500).json({msg: "" + error.message})
    }
    console.log("JWT Middleware token : " ,token);
    next();
}