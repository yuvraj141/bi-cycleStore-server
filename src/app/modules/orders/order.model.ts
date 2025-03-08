
import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema=new Schema<TOrder>({
    biCycle:{
        type:Schema.Types.ObjectId,
        ref:'BiCycle',
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:[ "pending","delivered", "cancelled"],
        default:"pending",
        required:true,
       
    },   
},{ timestamps: true })
export const Order=model<TOrder>('Order',orderSchema)