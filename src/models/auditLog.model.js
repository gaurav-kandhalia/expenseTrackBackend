import mongoose,{Schema, Types} from "mongoose";
import { object, string } from "zod";

const auditLogSchema = new mongoose.Schema(
    {
            userId:{
                type:Schema.Types.ObjectId,
                ref:"User",
                required:true
            },
            expenseId:{
                type:Schema.Types.ObjectId,
                ref:"EmployeeExpenses",
                required:true
            },
            action:{
                type:string,
                enum:["createExpense","updateStatus"],
                required:true
            },
            metaData:{
              type:Schema.Types.Mixed,
              default:{}
            },
            createdAt:{
                type:Date,
                default:Date.now
                
            }
},{
    timestamps:true
}
)

export const AuditLog = mongoose.model("AuditLog",auditLogSchema)