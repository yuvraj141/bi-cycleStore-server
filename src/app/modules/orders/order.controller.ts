import catchAsync from "../../../utlis/catchAsync";
import sendResponse from "../../../utlis/sendResponse";
import { OrderServices } from "./order.service";
import httpStatus from 'http-status';
const createOrder=catchAsync(async(req,res)=>{
    const email=req.user?.userEmail
    console.log(req.user);
    console.log("email :",email);
    console.log("req.body: ",req.body);
    const result=await OrderServices.createOrderIntoDB(email,req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order purchased successfully',
        data: result,
      });
})
//get myOrders
const getMyOrders=catchAsync(async(req,res)=>{
    const email=req.user?.userEmail
    const result=await OrderServices.getMyOrders(email)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'My Orders',
        data: result,
      });
})
//getAllOrders
const getAllOrders=catchAsync(async(req,res)=>{
    const result=await OrderServices.getAllOrders()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Orders retrieved successfully',
        data: result,
      })})
export const OrderController={
    createOrder,
    getMyOrders,
    getAllOrders
}