import { TUser } from "./user.interface";
import { User } from "./user.model";

//create user 
const registerUserIntoDB=async(payLoad:TUser)=>{
    const result=await User.create(payLoad)

    return result
}


export const UserServices={
    registerUserIntoDB
}