import { EmployeeExpenses } from "../../models/employeeExpense.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


export const getAllExpenses = asyncHandler(async(req,res)=>{
    const expenses = await EmployeeExpenses.find()
    .sort({ createdAt: -1 }) 
    .populate("userId", "fullName email") 
    .populate("category", "name"); 
    if(!expenses || expenses.length === 0){
        return res.status(201)
        .json(
            new ApiResponse(201,{},"no expense exists",true)
        )
    }

    res.status(201)
    .json(
        new ApiResponse(201,expenses,"expenses fetched successfully",true)
    )
})