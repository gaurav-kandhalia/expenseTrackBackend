import {z} from "zod";

export const expenseSchema = z.object({
    userId: z.string().nonempty("User ID is required"),
    amount: z.number().positive("Amount must be a positive number"),
    category: z.string().nonempty("Category is required"),
    notes: z.string().nonempty(),
    status: z.enum(["pending", "approved", "rejected"]).default("pending"),
    receipt: z.string().optional(), // URL or path to the uploaded receipt file (image or CSV)
    expenseDate: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
}, z.date()).optional(),
   
});
