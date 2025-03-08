import catchAsync from "../../utlis/catchAsync";
import sendResponse from "../../utlis/sendResponse";
import config from "../config";
import { AuthServices } from "./auth.service";
import httpStatus  from "http-status";
const loginUser=catchAsync(async(req,res)=>{
const result=await AuthServices.loginUser(req.body)
const {accessToken,refreshToken}=result
// console.log(accessToken);
res.cookie('refreshToken',refreshToken,{
    secure:config.node_env==='production',
    httpOnly:true,
    sameSite:"none",
    maxAge:1000*60*60*24*365
})
sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Login Success',
    data:{accessToken}
})
})
//refereshToken
const refreshToken=catchAsync(async(req,res)=>{
    const {refreshToken}=req.cookies
    const result=await AuthServices.refreshToken(refreshToken)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Token Refreshed',
        data:result
    })
})
export const AuthController={
    loginUser,
    refreshToken}