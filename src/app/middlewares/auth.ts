import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../../utlis/catchAsync";
import AppError from "../errors/AppError";
import httpStatus  from "http-status";
import jwt,{ JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";
const auth=(...requiredRoles:TUserRole[])=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const token=req.headers.authorization
        if(!token){
    throw new AppError(httpStatus.UNAUTHORIZED,'You  are not authorized')
        }
    const decoded=jwt.verify(token,config.jwt_access_secret as string) as JwtPayload
    const {role,userEmail,iat}=decoded
    //check user existence
    const user=await User.isUserExistsByEmail(userEmail)
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,'User not Found!')}
        const isDeleted=user?.isDeleted
        if(isDeleted){
            throw new AppError(httpStatus.FORBIDDEN,'user is deleted')
        }
        //user status
        const userStatus=user?.status
        if(userStatus==='inActive'){
            throw new AppError(httpStatus.FORBIDDEN,'User is Blocked')
        }
        //check role
        if(requiredRoles && !requiredRoles.includes(role)){
            throw new AppError(httpStatus.FORBIDDEN,'You are not authorized')
        }
        req.user=decoded as JwtPayload & {role:string}
        next()
    })
}
export default auth