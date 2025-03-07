export type TBiCycle={
    name:string
    brand:string
    model:string
    category:"MTB"| "Road"| "Hybrid"|"Electric"
    price:number
    stock:number
    imageUrl?:string
    description:string
    isDeleted:boolean
}