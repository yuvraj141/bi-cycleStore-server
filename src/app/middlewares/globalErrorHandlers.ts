import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error";
import config from "../config";
import handleValidationError from "../errors/handleValidationError";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleCastError from "../errors/handleCastError";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import AppError from "../errors/AppError";

const globalErrorHandler:ErrorRequestHandler=(err,req,res,next)=>{
    let statusCode=500
    let message='something went wrong'
    let errorSources:TErrorSources=[
        {
            path:'',
            message:'Something went wrong'
        }
    ]
    //mongoose error
    if(err?.name==='ValidationError'){
        const simplifiedError=handleValidationError(err)
        statusCode=simplifiedError.statusCode
        message=simplifiedError.message
        errorSources=simplifiedError.errorSources
    }else if(err instanceof ZodError){
        const simplifiedError=handleZodError(err)
        statusCode=simplifiedError.statusCode
        message=simplifiedError.message
        errorSources=simplifiedError.errorSources
    }else if(err?.name=='CastError'){
        const simplifiedError=handleCastError(err)
        statusCode=simplifiedError.statusCode
        message=simplifiedError.message
        errorSources=simplifiedError.errorSources
    }
    else if(err?.code===11000){
        const simplifiedError=handleDuplicateError(err)
        statusCode=simplifiedError.statusCode
        message=simplifiedError.message
        errorSources=simplifiedError.errorSources
    }  //App error
    else if(err instanceof AppError){
 statusCode=err.statusCode
 message=err.message
 errorSources=[
  {
    path:'',
    message:err?.message
  }
 ]
    }//Error
    else if(err instanceof Error){
 message=err.message
 errorSources=[
  {
    path:'',
    message:err?.message
  }
 ]
    }
  

    return res.status(statusCode).json({
        success:false,
        message,
        errorSources,
        stack:config.node_env ==='development' ? err?.stack :null
    })
}
export default globalErrorHandler