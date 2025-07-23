
import { expenseSchema,updateExpenseSchema } from "../Validations/expense.validations.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { EmployeeExpenses } from "../models/employeeExpense.model.js";
import {User} from '../models/user.model.js'
import { logAudit } from "../utils/logAudit.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Category } from "../models/category.model.js";
export const AddExpense = asyncHandler(async(req, res) => {
      const validatedData = expenseSchema.parse(req.body);

      //  const recieptLocalPath = req.files?.receipt[0]?.path;
       
      //  if(recieptLocalPath){
      //     const reciept = await uploadOnCloudinary(recieptLocalPath)
        
      //   validatedData.receipt = reciept?.url;
      //  }
         
      const expense = await EmployeeExpenses.create(validatedData);
      
        if (!expense) {
            throw new ApiError(400, "Expense creation failed");
        }
        await logAudit({
  userId: req.user._id,
  expenseId: expense._id,
  action: "createExpense",
  metadata:{
    amount:expense.amount,
    category:expense.category,
    notes:expense.notes,
    status:expense.status
  }
});
        res.status(201).json(
            new ApiResponse(201, "Expense created successfully", expense)
        );
}
)

export const allExpenses = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized user", false);
  }

  const expenses = await EmployeeExpenses.find({ userId }).sort({ createdAt: -1 })
  .populate("category", "name");
  ; 
   if(!expenses){
    res.status(200).json(
        new ApiResponse(200,{},"no expenses are exists")
    )
   }else{
         res.status(200).json(
    new ApiResponse(200, expenses, "Expenses fetched successfully")
  );
   }
 
});

export const deleteExpense = asyncHandler(async(req,res)=>{
    const expenseId = req.body;
    if(!expenseId){
      throw new ApiError(401,"expenseId is required",false);
    }
      const deletedExpense = await EmployeeExpenses.findOneAndDelete({
        _id: expenseId,
        userId: req.user._id
    });
    if(!deletedExpense){
      throw new ApiError(404,"expense not found or not authorized to delete");
    }
    res.status(200).json(
      new ApiResponse(200,{},"expense Deleted Successfully",true)
    )
})

export const updateExpense = asyncHandler(async(req,res)=>{
    
  const validatedData = updateExpenseSchema.parse(req.body);
 
  
  const expense = await EmployeeExpenses.findById({_id:validatedData.expenseId});
  if(!expense){
      throw new ApiError(404,"expense not found or you are unauthorized to update",false)
  }
  
  

  if (validatedData.amount !== undefined) expense.amount = validatedData.amount;
  if (validatedData.category !== undefined) expense.category = validatedData.category;
  if (validatedData.notes !== undefined) expense.notes = validatedData.notes;
  if (validatedData.createdAt) expense.createdAt = validatedData.createdAt;
  if (validatedData.status && req.user.role === "admin") expense.status = validatedData.status;

   if (req.user.role === "employee" && validatedData.status !==undefined) {
    throw new ApiError(401, "Unauthorized request to change the status", false);
  }

  
   
   await expense.save();
   res.status(200).json(
    new ApiResponse(200,expense,"expense updated successfully",true)
   )


})

export const getCategories = asyncHandler(async(req,res)=>{
     const categories = await Category.find();
    if(!categories || categories.length === 0){
        throw new ApiError(404,"No categories found",false);
    }
    res.status(200).json(
        new ApiResponse(200,categories,"Categories fetched successfully",true)
    )
})