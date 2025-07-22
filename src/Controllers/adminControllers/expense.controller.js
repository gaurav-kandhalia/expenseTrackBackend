import { EmployeeExpenses } from "../../models/employeeExpense.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { logAudit } from "../../utils/logAudit.js";
import { filterExpensesSchema, updateExpenseStatusSchema } from "../../Validations/expense.validations.js";


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

     await logAudit({
      userId:req.user._id,
      expenseId:updatedExpense._id,
      action:"updateStatus",
      metadata:{
        oldStatus:"pending",
        newStatus:updatedExpense.status
      }
     })

   res.status(201)
   .json(
    new ApiResponse(201,updatedExpense,"status updated Successfully",true)
   )
})

export const filterExpenses = asyncHandler(async (req, res) => {
  const validatedData = filterExpensesSchema.parse(req.body);

  const { status, category, employeeId, from, to } = validatedData;

  const filter = {};

  if (status) filter.status = status;
  if (category) filter.category = category;
  if (employeeId) filter.createdBy = employeeId;


  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) filter.createdAt.$lte = new Date(to);
  }

  const expenses = await EmployeeExpenses.find(filter)
    .populate("userId", "name email")
    .populate("category", "name")
    .sort({ createdAt: -1 });
      
    if(expenses.length === 0){
      return res.status(201)
      .json(
        new ApiResponse(201,expenses,"there is no any expense")
      )
    }

    

  res.status(200).json(
    new ApiResponse(200, expenses, "Filtered expenses fetched successfully", true)
  );
});



export const getExpenseStats = asyncHandler(async(req,res)=>{
    const {type,startDate,endDate} = req.query;
        console.log(type)
     if (!["category", "monthly"].includes(type)) {
    throw new ApiError(400, "Invalid stats type", false);
     }

     let stats;

     if(type==="category"){
      stats = await EmployeeExpenses.aggregate([
        {
          $group:{
            _id:"$category",
            totalAmount:{$sum:"$amount"},
            count:{$sum:1},
          }
        },
        {
          $lookup:{
            from :"categories",
            localField:"_id",
            foreignField:"_id",
            as:"categoryInfo"
          }
        },
        {$unwind:"$categoryInfo"},
        {
          $project:{
            _id:0,
            categoryInfo:"$categoryInfo",
            totalAmount:1,
            count:1
          }
        },

        {
          $sort:{totalAmount:-1}
        }
      ])
     } else if (type === "monthly") {
  stats = await EmployeeExpenses.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m", date: "$createdAt" },
        },
        totalAmount: { $sum: "$amount" },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);
}

     if(stats.length === 0){
      return res.status(201).
      json(
        new ApiResponse(201,stats,"there is no any stats present")
      )
     }

     res.status(201).json(
      new ApiResponse(201,stats,"stats for the type is fetched successfully",true)
     )
})

