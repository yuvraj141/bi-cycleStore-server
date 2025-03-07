import { model, Schema } from "mongoose";
import { TBiCycle } from "./biCycle.interface";

const biCycleSchema=new Schema<TBiCycle>({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    brand:{
        type:String,
        trim:true,
        required:true,
    },
    model:{
        type:String,
        trim:true,
        required:true,
    },
    category:{
        type:String,
        trim:true,
        enum:["MTB", "Road", "Hybrid","Electric"],
    },
    price:{
        type:Number,
        trim:true,
        required:true,
    },
    stock:{
        type:Number,
        trim:true,
        required:true,
    },
    description:{
        type:String,
        trim:true,
        required:true,
    },
    isDeleted: {
        type: Boolean,
        trim:true,
        default: false,
      },
}, {
    timestamps: true,})

export const BiCycle=model<TBiCycle>('BiCycle',biCycleSchema)