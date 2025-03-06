export type TUser={
    name:string
    email:string
    password:string
    passwordChangedAt?: Date;
    role:'admin'|'customer'
    isDeleted:boolean
    status:'active'|'inActive'
}