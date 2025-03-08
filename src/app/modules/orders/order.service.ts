import AppError from "../../errors/AppError";
import { BiCycle } from "../biCycle/biCycle.model";
import { User } from "../user/user.model";
import { TOrder } from "./order.interface";
import httpStatus from 'http-status'
import { Order } from "./order.model";
import mongoose from "mongoose";
const createOrderIntoDB=async(email:string,payLoad:TOrder)=>{
    const session=await mongoose.startSession()
    session.startTransaction()
   try {
     //check if biCycle exists
     const {biCycle,quantity}=payLoad
     const isBiCycleExists=await BiCycle.findById(biCycle)
     if(!isBiCycleExists){
         throw new AppError(httpStatus.NOT_FOUND,'BiCycle Not Found')
     }
     //check quantity
     if(isBiCycleExists.stock<quantity){
         throw new AppError(httpStatus.BAD_GATEWAY,'Out of Stock')
     }
     //user
     const  user=await User.findOne({email:email},{_id:1})
    // console.log("user details:",user);
     if(!user){
         throw new AppError(httpStatus.NOT_FOUND,'User not Found')
     }
     //price
     const totalPrice=isBiCycleExists.price*quantity
     payLoad.totalPrice=totalPrice
 
     const order=await Order.create([{
         ...payLoad,
         user:user._id
     }],{session:session})
    const updateStock=await BiCycle.findByIdAndUpdate(biCycle,{
        stock:isBiCycleExists.stock-quantity
    },{new:true})
    console.log("updated stock",updateStock);
    await session.commitTransaction()
    session.endSession()

    return order

   } catch (err:any) {
    await session.abortTransaction()
    session.endSession()
    throw new Error(err)
   }
}
//get myOrders
const getMyOrders=async(email:string)=>{
    const user=await User.findOne({email:email},{_id:1})
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,'User not Found')
    }
    const orders=await Order.find({user:user._id})
    return orders
}
//getAllOrders
const getAllOrders=async()=>{
    const orders=await Order.find().populate('user')
    return orders
}
export const OrderServices={
    createOrderIntoDB,
    getMyOrders,
    getAllOrders
}