import catchAsync from "../../../utlis/catchAsync";
import sendResponse from "../../../utlis/sendResponse";
import { BiCycleServices } from "./biCycle.service";
import httpStatus  from "http-status";
const createBiCycles=catchAsync(async(req,res)=>{
    const result=await BiCycleServices.createBiCyclesIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'BiCycle added successfully',
        
        data: result,
      });
})
//getAll
const getAllBiCycles=catchAsync(async(req,res)=>{
    const result=await BiCycleServices.getAllBiCyclesFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'BiCycles retrieved successfully',
        
        data: result,
      });
})
// get single
const getSingleBiCycle=catchAsync(async(req,res)=>{
    const id=req.params.id
    const result=await BiCycleServices.getSingleBiCycleFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Particular BiCycles retrieved successfully',
        
        data: result,
      });
})
//update BiCycle
const updateBiCycle=catchAsync(async(req,res)=>{
    const {id}=req.params
    const result=await BiCycleServices.updateBiCycleIntoDB(id,req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' BiCycle Updated successfully',
        
        data: result,
      });
})
//delete BiCycle
const deleteBiCycle=catchAsync(async(req,res)=>{
    const {id}=req.params
    const result=await BiCycleServices.deleteBiCycleIntoDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' BiCycle deleted successfully',
        
        data: result,
      });
})
export const BiCycleControllers={
    createBiCycles,
   getAllBiCycles,
   getSingleBiCycle,
   updateBiCycle,
   deleteBiCycle
}