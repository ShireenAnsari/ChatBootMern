import { NextFunction,Request,Response } from "express"
import UserModels from "../models/User-models.js"
import { hash,compare } from 'bcrypt'
export const getAllUsers=async(req:Request,res:Response,next:NextFunction)=>{
try {
    const user=await UserModels.find().select('-password')
    return res.status(201).json({message:'ok',user})
    
} catch (error) {
    console.log(error)
    return res.status(500).json({message:'Error',cause:error.message})
}
}
export const Signup=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        // user signup
        const {name,email,password}=req.body;
        const existingUser=await UserModels.findOne({email})
        if(existingUser) return res.status(401).send("User already registered")
        const hashedPassword=await hash(password,10)
        const user= new UserModels({name,email,password:hashedPassword})
        await user.save();
        return res.status(200).json({message:'ok',id:user._id.toString()})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Error',cause:error.message})
    }
}
export const Login=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        // user login
        const {email,password}=req.body;
       const user=await UserModels.findOne({email})
       if(!user)
        {
         return res.status(401).send('User not found')
        }
   const isPasswordcorrect=await compare(password,user.password)
   if(!isPasswordcorrect)
    {
        return res.status(403).send('Incorrect password')
    }
    return res.status(200).json({message:'ok',id:user._id.toString()});
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Error',cause:error.message})
    }
}


