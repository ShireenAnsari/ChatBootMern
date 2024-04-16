import  jwt  from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import { COOKIE_NAME } from "./constants.js";
export const createToken=(id:string,email:String,expiresIn)=>{
    const payload={id,email};
    const token=jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:'7d',
    });
    return token;

}
export const verifyToken=async(req:Request,res:Response,next:NextFunction)=>{
const token=req.signedCookies[`${COOKIE_NAME}`]
if(!token || token.trim()==='')
    {
   return res.status(401).json({message:'Token not Recieved'})
    }
return new Promise<void>((resolve,reject)=>{
    return jwt.verify(token,process.env.JWT_SECRET,(err,success)=>{
        if(err)
            {
                reject(err.message)
                return res.status(401).json({message:'Token expired'})
            }
            else{
                console.log('Token verification successful');
                resolve();
                res.locals.jwtData=success;
                return next();
            }

    })
})
// console.log(token)
}