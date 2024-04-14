import { ValidationChain, body, validationResult } from "express-validator";
import {Request,Response,NextFunction} from 'express'

export const validate=(validations:ValidationChain[])=>{
return async(req:Request,res:Response,next:NextFunction)=>{
    for(let validation of validations )
        {
            const result=await validation.run(req)
            if(result.isEmpty())
                {
                    break;
                }
        }
        const error=validationResult(req);
        if(error.isEmpty())
            {
              return  next()
            }
         return   res.status(422).json({error:error.array()})

}
}

export const Loginvalidater=[
    body('email').trim().isEmail().notEmpty().withMessage('Email is required'),
    body('password').trim().isLength({min:6}).notEmpty().withMessage('Password is required should contain atleast 6 characters')
]
export const signUpvalidater=[
    body('name').notEmpty().withMessage('Name is required'),
    ...Loginvalidater,
]