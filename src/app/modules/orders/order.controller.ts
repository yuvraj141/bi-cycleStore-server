import catchAsync from "../../../utlis/catchAsync";
import sendResponse from "../../../utlis/sendResponse";
import { OrderServices } from "./order.service";
import httpStatus from 'http-status';
const createOrder=catchAsync(async(req,res)=>{
    const userId=req.userId
    console.log("userid",userId);
    console.log("req.body: ",req.body);
    const result=await OrderServices.createOrderIntoDB(userId,req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order purchased successfully',
        data: result,
      });
})
export const OrderController={
    createOrder
}