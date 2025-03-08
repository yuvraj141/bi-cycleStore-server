import { TUser } from "./user.interface";
import { User } from "./user.model";

//create user 
const registerUserIntoDB=async(payLoad:TUser)=>{
    const result=await User.create(payLoad)

    return result
}
//block user
const changeStatus=async(id:string,payLoad:{status:string})=>{
    const result=await User.findByIdAndUpdate(id,payLoad,{
        new:true
    })
    return result
}
//create admin
const createAdminIntoDB=async(payLoad:TUser)=>{
    const result=await User.create(payLoad)

    return result
}
export const UserServices={
    registerUserIntoDB,
    changeStatus
}