import AppError from "../errors/AppError";
import { User } from "../modules/user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from 'http-status';
import { createToken, verifyToken } from "./auth.utils";
import config from "../config";
const loginUser=async(payLoad:TLoginUser)=>{
    //check user existence
    const user=await User.isUserExistsByEmail(payLoad.email)
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,'User not Found!')
    }
    const isDeleted=user?.isDeleted
    if(isDeleted){
        throw new AppError(httpStatus.FORBIDDEN,'user is deleted')
    }
    //user status
    const userStatus=user?.status
    if(userStatus==='inActive'){
        throw new AppError(httpStatus.FORBIDDEN,'User is Blocked')
    }
    //pass check
    if(!await User.isPasswordMatched(payLoad.password,user.password)){
        throw new AppError(httpStatus.UNAUTHORIZED,'Invalid Password')
    }
    const jwtPayload={
        userEmail:user.email,
        role:user.role
    }
    const accessToken=createToken(jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string)
    const refreshToken=createToken(jwtPayload,config.jwt_refresh_secret as string,config.jwt_access_expires_in as string)
    return {
        accessToken,refreshToken
    }
}
//refreshToken
const refreshToken=async(token:string)=>{
const decoded=verifyToken(token,config.jwt_refresh_secret as string)
const {userEmail,iat}=decoded
 
const user=await User.isUserExistsByEmail(userEmail)
if(!user){
    throw new AppError(httpStatus.NOT_FOUND,'User not Found!')
}
const isDeleted=user?.isDeleted
if(isDeleted){
    throw new AppError(httpStatus.FORBIDDEN,'user is deleted')
}
//user status
const userStatus=user?.status
if(userStatus==='inActive'){
    throw new AppError(httpStatus.FORBIDDEN,'User is Blocked')
}
const jwtPayload={
    userEmail:user.email,
    role:user.role
}
const accessToken=createToken(jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string)
    
    return {
        accessToken
    }
}
export const AuthServices={
    loginUser,
    refreshToken
}