import QueryBuilder from "../../builder/QueryBuilder";
import { TBiCycle } from "./biCycle.interface";
import { BiCycle } from "./biCycle.model";
const cycleSearchableFields=['name','brand','category','model']
const createBiCyclesIntoDB=async(payLoad:TBiCycle)=>{
    const result=await BiCycle.create(payLoad)
    console.log(payLoad);
    return result
}
//getAll Cycles
const getAllBiCyclesFromDB=async(query:Record<string,unknown>)=>{
    const cycleQuery=new QueryBuilder(BiCycle.find(),query).search(cycleSearchableFields).filter().sort().paginate().fields()

    const result=await cycleQuery.modelQuery
    const meta=await cycleQuery.countTotal()
    return {result,meta}
}
//getSingle
const getSingleBiCycleFromDB=async(id:string)=>{
    const result=await BiCycle.findById(id)
    return result
}
//update
const updateBiCycleIntoDB=async(id:string,payLoad:Partial<TBiCycle>)=>{
    const result=await BiCycle.findOneAndUpdate({_id:id},payLoad,{new:true})
    return result
}
//delete
const deleteBiCycleIntoDB=async(id:string)=>{
    const result=await BiCycle.findOneAndUpdate({_id:id},{isDeleted:true},{new:true})
    return result
}
export const BiCycleServices={
    createBiCyclesIntoDB,
    getAllBiCyclesFromDB,
    getSingleBiCycleFromDB,
    updateBiCycleIntoDB,
    deleteBiCycleIntoDB
}