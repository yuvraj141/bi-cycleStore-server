import { Model } from "mongoose";
import { USER_ROLE } from "./user.const";

export type TUser={
    name:string
    email:string
    password:string
    passwordChangedAt?: Date;
    role:'admin'|'customer'
    isDeleted:boolean
    status:'active'|'inActive'
}
export interface UserModel extends Model<TUser>{
    isUserExistsByEmail(email:string):Promise<TUser>
    //pass match
    isPasswordMatched(plainTextPassword:string,
        hashedPassword:string
    ):Promise<boolean>
}
export type TUserRole=keyof typeof USER_ROLE