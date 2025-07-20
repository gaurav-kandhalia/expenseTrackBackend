import mongoose, { Schema } from "mongoose";

const employeeExpenseSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"]
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"]
        },
        category: {
            type: String,
            required: [true, "Category is required"],
        },
        notes: {
            type: String,
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        },
        receipt: {
            type: String, // URL to the receipt image
            r
        },

        expenseDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)

export const EmployeeExpenses = mongoose.model("EmployeeExpenses", employeeExpenseSchema)