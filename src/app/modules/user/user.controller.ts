import catchAsync from "../../../utlis/catchAsync";
import sendResponse from "../../../utlis/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from 'http-status';
const registerUser=catchAsync(async(req,res)=>{
    const user=req.body
    console.log("from controller ",req.body);
    const result=await UserServices.registerUserIntoDB(user)
    
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Registration Successful',
        data:result
    })
})

export const UserControllers={
    registerUser
}