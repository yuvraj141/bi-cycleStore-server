import { AnyZodObject } from "zod";
import catchAsync from "../../utlis/catchAsync";
import { NextFunction, Request, Response } from "express";

const validateRequest=(schema:AnyZodObject)=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        console.log(req.body)
        await schema.parseAsync({
            body:req.body,
            cookies:req.cookies
        })
        next()
    })
}
export default validateRequest