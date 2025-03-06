import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";
const userSchema=new Schema<TUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    passwordChangedAt:{
        type:Date
    },
    role:{
        type:String,
        enum:['admin','customer'],
        default:'customer'
    },
    status:{
        type:String,
        enum:['active','inActive'],
        default:'active'
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

userSchema.pre('save',async function(next){
    //hash password
    this.password=await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds)
    )
    next()
})
userSchema.post('save',function(doc,next){
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    doc.password='',
    next()
})
export const User=model<TUser>('User',userSchema)