import AppError from "../../errors/AppError";
import { BiCycle } from "../biCycle/biCycle.model";
import { User } from "../user/user.model";
import { TOrder } from "./order.interface";
import httpStatus from 'http-status'
const createOrderIntoDB=async(userId:string,payLoad:TOrder)=>{
    //check if biCycle exists
    const {biCycle,quantity}=payLoad
    const isBiCycleExists=await BiCycle.findById(biCycle)
    if(!isBiCycleExists){
        throw new AppError(httpStatus.NOT_FOUND,'BiCycle Not Found')
    }
    //check quantity
    if(isBiCycleExists.stock<=0){
        throw new AppError(httpStatus.BAD_GATEWAY,'Out of Stock')
    }
    const  user=await User.findById(userId)
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,'User not Found')
    }
    //price
    const totalPrice=isBiCycleExists.price*quantity
   // const updateStock=await biCycle.
}
export const OrderServices={
    createOrderIntoDB
}