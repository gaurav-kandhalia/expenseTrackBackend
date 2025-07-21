import { EmployeeExpenses } from "../../models/employeeExpense.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { updateExpenseStatusSchema } from "../../Validations/expense.validations.js";


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

export const updateExpenseStatus = asyncHandler(async(req,res)=>{
    const validatedData = updateExpenseStatusSchema.parse(req.body);
    const status = validatedData.status;
   const updatedExpense = await EmployeeExpenses.findByIdAndUpdate(validatedData.expenseId,{status},{new:true});
   if(!updatedExpense) {
    throw new ApiError(404,"something went wrong",false)
   }

   res.status(201)
   .json(
    new ApiResponse(201,updatedExpense,"status updated Successfully",true)
   )
})