
import { expenseSchema } from "../Validations/expense.validations.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";
import { EmployeeExpenses } from "../models/employeeExpense.model.js";

export const AddExpense = asyncHandler(async(req, res) => {
      const validatedData = expenseSchema.parse(req.body);
      
      const expense = await EmployeeExpenses.create(validatedData);
        if (!expense) {
            throw new ApiError(400, "Expense creation failed");
        }
        res.status(201).json(
            new ApiResponse(201, "Expense created successfully", expense)
        );
}
)