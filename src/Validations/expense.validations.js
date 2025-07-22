import {z} from "zod";

export const expenseSchema = z.object({
    userId: z.string().nonempty("User ID is required"),
    amount: z.coerce.number().positive("Amount must be a positive number"),
    category: z.string().nonempty("Category is required"),
    notes: z.string().nonempty(),
    status: z.enum(["pending", "approved", "rejected"]).default("pending"),
    receipt: z.string().optional(), // URL or path to the uploaded receipt file (image or CSV)
    createdAt: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
}, z.date()).optional(),
   
});


export const updateExpenseSchema = z.object({
    expenseId: z.string().nonempty("expenseId is required"),
     amount: z.coerce.number().positive("Amount must be a positive number").optional(),
    category: z.string().nonempty("Category is required").optional(),
    notes: z.string().nonempty().optional(),
    status: z.enum(["pending", "approved", "rejected"]).optional(),
     createdAt: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
}, z.date()).optional(),
})

export const updateExpenseStatusSchema = z.object({
  expenseId: z.string({
    required_error: "Expense ID is required",
    invalid_type_error: "Expense ID must be a string",
  }),

  status: z.enum(["approved", "rejected"], {
    required_error: "Status is required and must be 'approved' or 'rejected'",
  }),
});

export const filterExpensesSchema = z.object({
  status: z.enum(["approved", "pending", "rejected"]).optional(),
  category: z.string().optional(),      
  employeeId: z.string().optional(),    
  from: z.string().optional(),           
  to: z.string().optional(),             
});
